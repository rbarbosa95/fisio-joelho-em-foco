<template>
  <div>
    <progress-status />
    <v-container class="ma-12">
      <v-row class="align-center justify-center">
        <v-col cols="12" sm="4" class="mr-10">
          <h1 class="display-3 text-center">Login do {{ type }}</h1>
          <p>
            Login
          </p>
          <v-form v-model="valid" ref="form" @submit.prevent="submit()">
            <v-text-field
              v-model.trim="email"
              :rules="emailRules"
              label="Insira seu e-mail"
              outlined
              required
              solo
              flat
            ></v-text-field>
            <p>
              Senha
            </p>
            <v-text-field
              v-model.trim="pass"
              label="Insira sua senha"
              :rules="passRules"
              type="password"
              color="secondary"
              outlined
              required
              solo
              flat
            ></v-text-field>
            <v-btn
              block
              x-large
              :loading="loading"
              color="primary text-capitalize"
              type="submit"
            >
              Entrar
            </v-btn>
            <v-btn
              text
              block
              x-large
              color="info text-capitalize"
              to="/"
              class="mt-5"
            >
              Voltar
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img src="@/assets/img/figure-login.png" width="100%" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProgressStatus from '@/components/common/ProgressStatus'

export default {
  name: 'Login',
  components: {
    ProgressStatus
  },
  data: () => ({
    loading: false,
    valid: false,
    pass: '',
    passRules: [v => !!v || 'Senha é necessário'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail é necessário',
      v => /.+@.+/.test(v) || 'E-mail deve ser válido'
    ]
  }),
  beforeCreate() {
    this.$store.commit('app/setView')
  },
  created() {
    this.$store.getters['auth/geToken'].isTokenSet
      ? this.$router.push({ name: 'home' })
      : ''
  },
  beforeDestroy() {
    this.$store.commit('app/setView')
  },
  computed: {
    type() {
      return this.$route.query.type === '1' ? 'Fisioteraupeta' : 'Paciente'
    }
  },
  methods: {
    submit() {
      if (this.valid) {
        this.loading = !this.loading
        this.$store.commit('app/inProgress')
        this.$store
          .dispatch('auth/singIn', {
            identifier: this.email,
            password: this.pass
          })
          .then(res => {
            if (res?.status !== 200) {
              this.$store.commit('app/seProgressStatus', 'error')
              this.$store.commit('app/setAlert')
              this.$store.commit('app/setMessage', 'E-mail ou usuário inválido')
              this.$refs.form.reset()
            } else {
              this.$store.commit('app/seProgressStatus', 'success')
              this.$store.commit('app/setAlert')
              this.$store.commit('app/setMessage', 'Seja bem-vindo!')
            }
            this.loading = !this.loading
            this.$store.commit('app/inProgress')
          })
      } else {
        this.$refs.form.validate()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
