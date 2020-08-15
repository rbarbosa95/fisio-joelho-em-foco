<template>
  <v-card>
    <v-card-text>
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading">Escala de Humor</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text v-if="lastReply">
        <v-divider></v-divider>
        <v-img src="@/assets/img/moodscale.png" class="d-flex justify-center" />
        <app-radio-multi
          value="mood"
          :question="form.mood"
          :data="data"
          :row="true"
          @changeRadio="changeRadio"
        />
        <v-text-field
          v-model="form.other"
          label="Outro"
          outlined
          flat
        ></v-text-field>
        <v-btn block color="success" dark @click="submit()">
          Enviar resposta
          <v-icon class="ml-2">
            mdi-upload
          </v-icon>
        </v-btn>
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
import AppRadioMulti from '@/components/common/AppRadioMulti'

export default {
  name: 'pain',
  components: {
    AppRadioMulti
  },
  data: () => ({
    date: new Date().toISOString().slice(0, 10),
    reply: '',
    loading: false,
    user: {
      id: ''
    },
    form: {
      mood: 'reply1',
      dateReply: '',
      other: '',
      user: ''
    },
    data: [
      'Calmo',
      'Feliz',
      'Cheio de energia',
      'Com variações de humor',
      'Irritado',
      'Triste',
      'Ansioso',
      'Desanimado',
      'Apático'
    ]
  }),
  beforeCreate() {
    this.$store.dispatch('auth/profile').then(() => {
      this.getUser(this.$store.getters['auth/getuser'])
      this.$store
        .dispatch('moodScale/getMoodScale', {
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
    }
  },
  methods: {
    getUser(value) {
      this.user = {
        id: value.id
      }
    },
    submit() {
      this.loading = !this.loading
      this.form.user = this.user.id
      this.form.dateReply = this.date
      this.$store.commit('app/inProgress')
      this.$store
        .dispatch('moodScale/sendMoodScale', this.form)
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
    },
    changeRadio(payload, question) {
      this.form[question] = payload
    }
  }
}
</script>

<style lang="scss" scoped></style>
