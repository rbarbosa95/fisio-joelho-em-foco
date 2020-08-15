<template>
  <div>
    <v-expand-transition>
      <v-card class="mb-12" v-show="show" id="top">
        <v-img :src="form.sourceImage" height="250" position="top"></v-img>
        <v-card-title class="title font-weight-regular">
          Artigos
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit()">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
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
                    label="Imagem"
                    v-model.lazy="form.sourceImage"
                    :rules="notEmpty"
                    outlined
                    required
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="slug"
                    v-model="slug"
                    outlined
                    required
                    flat
                    disabled=""
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="form.date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formatDate"
                        label="Data de Publicação"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date"
                      no-title
                      scrollable
                      locale="pt-br"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(form.date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Texto prévia"
                    v-model="form.preview"
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="form.user"
                    :items="users"
                    item-text="firstName"
                    item-value="id"
                    label="Fisioterapeuta"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-alert type="info" :value="true">
                    Click sempre no box abaixo para atualizar as infomrações
                  </v-alert>
                  <vue-simplemde
                    v-model="form.text"
                    ref="markdownEditor"
                    :configs="configs"
                  />
                </v-col>
                <v-col cols="3" v-show="false">
                  <v-text-field
                    solo
                    v-model="form.likes.heart"
                    disabled
                  ></v-text-field>
                  <v-text-field
                    solo
                    v-model="form.likes.id"
                    disabled
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
        Seus Artigos
        <v-btn
          small
          depressed
          color="primary"
          class="text-capitalize"
          @click="create"
        >
          Novo Artigo
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <div v-for="item in sources" :key="item.id">
        <v-list-item>
          <v-list-item-avatar color="grey">
            <v-img :src="item.sourceImage"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              by {{ item.user.firstName }} {{ item.user.lastName }}
              <v-btn color="info" text small
                ><v-icon left>mdi-heart-plus</v-icon
                >{{ item.likes.heart }}</v-btn
              >
            </v-list-item-subtitle>
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
import VueSimplemde from 'vue-simplemde'
import moment from 'moment'

export default {
  name: 'HomeArticles',
  components: {
    AppSwitch,
    VueSimplemde
  },
  data: () => ({
    show: false,
    form: {
      title: '',
      sourceImage: '',
      text: '',
      slug: '',
      date: new Date(),
      preview: '',
      public: false,
      user: '',
      likes: {
        id: '',
        heart: 0
      }
    },
    notEmpty: [v => !!v || 'Esse campo  é necessário'],
    valid: false,
    edit: false,
    configs: {
      spellChecker: false
    },
    menu: false,
    modal: false
  }),
  beforeCreate() {
    this.$store.dispatch('articles/getArticles')
  },
  created() {
    this.$store.dispatch('users/getUsers', {
      'role.type_eq': 'physiotherapy'
    })
  },
  computed: {
    sources() {
      return this.$store.getters['articles/getArticles']
    },
    slug: {
      get() {
        return this.slugify(this.form.title)
      },
      set(newValue) {
        this.form.slug = this.slug
        return newValue
      }
    },
    formatDate: {
      get() {
        return this.form.date ? moment(this.form.date).format('LL') : ''
      },
      set(newValue) {
        this.form.date = newValue
        return newValue
      }
    },
    users() {
      return this.$store.getters['users/getUsers']
    }
  },
  methods: {
    async changeSwitch(payload) {
      this.$store.commit('app/inProgress')
      await this.$store
        .dispatch('articles/hasArticlePublic', payload)
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
              payload.change ? 'Artigo Publicado' : 'Artigo Ocultado'
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
          .dispatch('articles/createArticle', this.form)
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
          .dispatch('articles/updateArticle', this.form)
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
      await this.$store.dispatch('articles/deleteArticle', payload)
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
        sourceImage: item.sourceImage,
        text: item.text,
        slug: item.slug,
        date: item.date,
        preview: item.preview,
        public: item.public,
        user: item.user.id,
        likes: {
          id: item.likes.id,
          heart: item.likes.heart
        }
      }
      this.scrollTo()
    },
    formClear() {
      this.form = {
        title: '',
        sourceImage: '',
        text: '',
        slug: '',
        date: '',
        preview: '',
        public: false,
        user: '',
        likes: {
          id: '',
          heart: 1
        }
      }
    },
    submit() {
      this.setSlug()
      this.edit ? this.update() : this.save()
    },
    slugify(text, ampersand = 'and') {
      const a = 'ãàáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ'
      const b = 'aaaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh'
      const p = new RegExp(a.split('').join('|'), 'g')
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
    setSlug() {
      this.form.slug = this.slug
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
</style>
