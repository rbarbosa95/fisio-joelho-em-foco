<template>
  <v-card>
    <v-card-text>
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading">Escala de dor</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text v-if="lastReply">
        <v-row class="mb-4" justify="space-between">
          <v-col class="text-left">
            <span class="display-3 font-weight-light" v-text="bpm"></span>
            <span class="subheading font-weight-light mr-1">DOR</span>
            <v-fade-transition>
              <v-avatar
                v-if="bpm > 0"
                :color="color"
                :style="{
                  animationDuration: animationDuration
                }"
                class="mb-1 v-avatar--metronome"
                size="12"
              ></v-avatar>
            </v-fade-transition>
          </v-col>
          <v-col class="text-right">
            <v-btn
              :color="color"
              class="white--text"
              depressed
              :loading="loading"
              @click="submit"
            >
              Enviar resposta
              <v-icon class="ml-2">
                mdi-upload
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-slider
          v-model="bpm"
          :color="color"
          track-color="grey"
          always-dirty
          min="0"
          max="10"
        >
          <template v-slot:prepend>
            <v-icon :color="color" @click="decrement">
              mdi-minus
            </v-icon>
          </template>

          <template v-slot:append>
            <v-icon :color="color" @click="increment">
              mdi-plus
            </v-icon>
          </template>
        </v-slider>
        <v-divider></v-divider>
        <v-img src="@/assets/img/pain-scale@2x.png" />
      </v-card-text>
      <v-card-text v-else>
        <v-alert type="success" :value="true" class="text-center">
          Você já respondeu sua escala hoje 🤗 <br />
          volte aqui para responder na sua próxima consulta 🙂
        </v-alert>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'pain',
  data: () => ({
    date: new Date().toISOString().slice(0, 10),
    reply: '',
    bpm: 0,
    interval: null,
    loading: false,
    user: {
      id: ''
    },
    form: {
      pain: 0,
      dateReply: '',
      user: ''
    }
  }),
  beforeCreate() {
    this.$store.dispatch('auth/profile').then(() => {
      this.getUser(this.$store.getters['auth/getuser'])
      this.$store
        .dispatch('painScale/getPainScale', {
          'user.id_eq': this.user.id
        })
        .then(res => {
          if (res?.data.length > 0) {
            let replys = res?.data.map(item => {
              let [year, month, day] = item.dateReply.split('-')
              let date = new Date(`${month}-${day}-${year}`)
              return date.getTime()
            })
            this.reply = Math.max(...replys)
          }
        })
    })
  },
  computed: {
    lastReply() {
      let [year, month, day] = this.date.split('-')
      let now = new Date(`${month}-${day}-${year}`)
      return now.getTime() > this.reply
    },
    color() {
      if (this.bpm < 2) return 'info'
      if (this.bpm < 4) return 'teal'
      if (this.bpm < 6) return 'yellow darken-1'
      if (this.bpm < 8) return 'orange'
      return 'red'
    },
    animationDuration() {
      return `${3 / this.bpm}s`
    }
  },
  methods: {
    getUser(value) {
      this.user = {
        id: value.id
      }
    },
    decrement() {
      this.bpm--
    },
    increment() {
      this.bpm++
    },
    submit() {
      this.loading = !this.loading
      this.form.user = this.user.id
      this.form.dateReply = this.date
      this.form.pain = this.bpm
      this.$store.commit('app/inProgress')
      this.$store
        .dispatch('painScale/sendPainScale', this.form)
        .then(res => {
          this.$store.commit('app/inProgress')
          if (res?.status !== 200) {
            this.$store.commit('app/seProgressStatus', 'error')
            this.$store.commit('app/setAlert')
            this.$store.commit(
              'app/setMessage',
              'No momento não foi possivél realizar sua alteração!'
            )
          } else {
            this.$store.commit('app/seProgressStatus', 'info')
            this.$store.commit('app/setAlert')
            this.$store.commit(
              'app/setMessage',
              'Informação atualizada com sucesso'
            )
          }
        })
        .then(() => {
          this.loading = !this.loading
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes metronome-example {
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
}

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
