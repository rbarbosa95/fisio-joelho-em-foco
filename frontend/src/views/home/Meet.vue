<template>
  <v-card>
    <v-card-title primary-title> Google Meet </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert type="info" :value="true">
        Não se esqueça de responder sua escalar de dor e humor antes de entrar
        na consulta 😉
      </v-alert>
      <v-btn block color="success" :href="meet" target="_blank">
        Fazer Consulta
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Meet',
  data: () => ({
    user: {},
    meet: ''
  }),
  beforeCreate() {
    this.$store.dispatch('auth/profile').then(() => {
      this.getUser(this.$store.getters['auth/getuser'])
      this.$store
        .dispatch('meet/getOneMeet', this.user?.google_meet)
        .then(res => {
          if (res?.status === 200) {
            this.meet = res?.data?.link
          } else {
            this.$store.commit('app/seProgressStatus', 'warning')
            this.$store.commit('app/setAlert')
            this.$store.commit(
              'app/setMessage',
              'No momento não tem nenhuma consulta para você'
            )
            this.$router.push({ name: 'home' })
          }
        })
        .catch(error => {
          console.error('error', error)
        })
    })
  },
  methods: {
    getUser(value) {
      this.user = {
        google_meet: value.google_meet
      }
    }
  }
}
</script>

<style></style>
