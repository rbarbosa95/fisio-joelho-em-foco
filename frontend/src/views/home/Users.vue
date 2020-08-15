<template>
  <div>
    <v-expand-transition>
      <v-card class="mb-12" v-show="show" id="top">
        <v-card-title class="title font-weight-regular">
          Usuários
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit()">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Username"
                    :rules="notEmpty"
                    v-model="form.username"
                    outlined
                    required
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Password"
                    v-model="form.password"
                    :rules="edit ? rule : notEmpty"
                    outlined
                    required
                    flat
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Email"
                    v-model="form.email"
                    :rules="notEmpty"
                    outlined
                    required
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="form.role"
                    :items="roles"
                    item-text="name"
                    item-value="id"
                    label="Role"
                    :rules="notEmpty"
                    required
                    outlined
                    :disabled="edit ? true : false"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Nome"
                    v-model="form.firstName"
                    :rules="notEmpty"
                    outlined
                    required
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Sobrenome"
                    v-model="form.lastName"
                    outlined
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
        Seus Usuários
        <v-btn
          small
          depressed
          color="primary"
          class="text-capitalize"
          @click="create"
        >
          Novo Usuário
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <div v-for="item in sources" :key="item.id">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ item.firstName || item.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <div class="mx-2">
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
            :change-switch="item.blocked"
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
  name: 'Users',
  components: {
    AppSwitch
  },
  data: () => ({
    show: false,
    form: {
      username: '',
      password: '',
      email: '',
      role: 3,
      lastName: '',
      firstName: '',
      blocked: false,
      confirmed: true
    },
    notEmpty: [v => !!v || 'Esse campo  é necessário'],
    rule: [],
    valid: false,
    edit: false,
    roles: [],
    sources: [],
    show1: false
  }),
  created() {
    this.getUsers()
    this.$store.dispatch('auth/getRoles').then(res => {
      res?.data?.roles.map(item => {
        this.roles.push({
          id: item.id,
          name: item.name
        })
      })
    })
  },
  methods: {
    async changeSwitch(payload) {
      this.$store.commit('app/inProgress')
      await this.$store
        .dispatch('auth/hasUserBlocked', payload)
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
              payload.change ? 'warning' : 'info'
            )
            this.$store.commit('app/setAlert')
            this.$store.commit(
              'app/setMessage',
              payload.change ? 'Usuário Bloqueado' : 'Usuário Desbloqueado'
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
          .dispatch('auth/createUsers', this.form)
          .then(res => {
            if (res?.status !== 201) {
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
              if (res?.data?.role?.type === 'customer') {
                this.$store.dispatch('answered/createAnswereds', {
                  user: res.data.id
                })
              }
              this.getUsers()
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
          .dispatch('auth/updateUser', this.form)
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
        username: item.username,
        password: item?.password,
        email: item.email,
        role: item?.role?.id,
        lastName: item.lastName,
        firstName: item.firstName,
        blocked: item.blocked,
        confirmed: item.confirmed
      }
      this.scrollTo()
    },
    formClear() {
      this.form = {
        username: '',
        password: '',
        email: '',
        role: 3,
        lastName: '',
        firstName: '',
        blocked: false,
        confirmed: true
      }
    },
    submit() {
      this.edit ? this.update() : this.save()
    },
    getUsers() {
      this.$store
        .dispatch('auth/getUsers')
        .then(res => {
          this.sources = res?.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
