<template>
  <div>
    <v-expand-transition>
      <v-card class="mb-12" v-show="show" id="top">
        <v-img
          :height="200"
          :src="`https://img.youtube.com/vi/${form.youtubeUrl}/hqdefault.jpg`"
        />
        <v-card-title class="title font-weight-regular">
          Vídeos
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit()">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="Título"
                    :rules="notEmpty"
                    v-model="form.title"
                    outlined
                    required
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="YouTube URL"
                    v-model="form.youtubeUrl"
                    :rules="notEmpty"
                    outlined
                    required
                    flat
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                class="text-capitalize"
                text
                small
                @click="close"
              >
                Fechar
              </v-btn>
              <v-btn
                color="success"
                class="text-capitalize"
                small
                text
                type="submit"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-expand-transition>
    <v-card>
      <v-card-title
        class="title font-weight-regular justify-space-between d-flex"
      >
        Seus Vídeos
        <v-btn
          small
          depressed
          color="primary"
          class="text-capitalize"
          @click="create"
        >
          Novo Vídeo
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <div v-for="item in sources" :key="item.id">
        <v-list-item>
          <v-list-item-avatar color="grey">
            <v-img
              :src="
                `https://img.youtube.com/vi/${item.youtubeUrl}/hqdefault.jpg`
              "
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>by Youtube</v-list-item-subtitle>
          </v-list-item-content>
          <div class="mx-2">
            <v-btn
              text
              small
              color="error"
              class="text-capitalize"
              @click="exclude(item.id)"
            >
              Excluir
            </v-btn>
            <v-btn
              text
              small
              color="info"
              class="text-capitalize"
              @click="editOpen(item.id)"
            >
              Editar
            </v-btn>
          </div>
          <app-switch
            @appSwitch="changeSwitch"
            :id="item.id"
            :change-switch="item.public"
          />
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-card>
  </div>
</template>

<script>
import AppSwitch from '@/components/common/AppSwitch'

export default {
  name: 'HomeVideos',
  components: {
    AppSwitch
  },
  data: () => ({
    show: false,
    form: {
      title: '',
      youtubeUrl: '',
      public: false
    },
    notEmpty: [v => !!v || 'Esse campo  é necessário'],
    valid: false,
    edit: false
  }),
  beforeCreate() {
    this.$store.dispatch('videos/getVideos')
  },
  computed: {
    sources() {
      return this.$store.getters['videos/getListVideos']
    }
  },
  methods: {
    async changeSwitch(payload) {
      this.$store.commit('app/inProgress')
      await this.$store
        .dispatch('videos/hasVideoPublic', payload)
        .then(res => {
          if (res?.status !== 200) {
            this.$store.commit('app/seProgressStatus', 'error')
            this.$store.commit('app/setAlert')
            this.$store.commit(
              'app/setMessage',
              'No momento não foi possivél realizar sua alteração!'
            )
            this.$refs.form.reset()
          } else {
            this.$store.commit(
              'app/seProgressStatus',
              payload.change ? 'info' : 'warning'
            )
            this.$store.commit('app/setAlert')
            this.$store.commit(
              'app/setMessage',
              payload.change ? 'Vídeo Publicado' : 'Vídeo Ocultado'
            )
          }
        })
        .then(() => {
          this.$store.commit('app/inProgress')
        })
    },
    async save() {
      this.$store.commit('app/inProgress')
      if (this.valid) {
        await this.$store
          .dispatch('videos/createVideo', this.form)
          .then(res => {
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
              this.$store.commit('app/setMessage', 'Criado com Sucesso')
            }
          })
          .then(() => {
            this.$store.commit('app/inProgress')
            this.close()
          })
      } else {
        this.$refs.form.validate()
      }
    },
    async update() {
      this.$store.commit('app/inProgress')
      if (this.valid) {
        await this.$store
          .dispatch('videos/updateVideos', this.form)
          .then(res => {
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
              this.$store.commit('app/setMessage', 'Criado com Sucesso')
            }
          })
          .then(() => {
            this.$store.commit('app/inProgress')
            this.close()
          })
      } else {
        this.$refs.form.validate()
      }
    },
    async exclude(payload) {
      await this.$store.dispatch('videos/deleteVideo', payload)
    },
    toggleCard() {
      this.show = !this.show
    },
    close() {
      this.toggleCard()
      this.formClear()
    },
    create() {
      this.edit = false
      this.toggleCard()
      this.formClear()
    },
    scrollTo() {
      this.show = true
      this.$vuetify.goTo('#top', {
        duration: 400,
        offset: 50,
        easing: 'easeInOutCubic'
      })
    },
    editOpen(payload) {
      this.edit = true
      let item = this.sources.find(item => {
        return item.id === payload
      })
      this.form = {
        id: item.id,
        title: item.title,
        youtubeUrl: item.youtubeUrl,
        public: item.public
      }
      this.scrollTo()
    },
    formClear() {
      this.form = {
        title: '',
        youtubeUrl: '',
        public: false
      }
    },
    submit() {
      this.edit ? this.update() : this.save()
    }
  }
}
</script>

<style lang="scss" scoped></style>
