<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="1500"
    right
    top
    :color="status"
    class="snackbar"
  >
    {{ text }}
    <v-btn color="white" text @click="close()" small>
      Fechar
      <v-icon small right>mdi-cancel</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'TheSnackBar',
  computed: {
    text() {
      return this.$store.getters['app/getMensage']
    },
    snackbar: {
      get() {
        return this.$store.getters['app/getAlert']
      },
      set(newValue) {
        this.$store.commit('app/setAlert')
        this.$store.commit('app/setMessage', '')
        this.$store.commit('app/seProgressStatus')
        return newValue
      }
    },
    status() {
      return this.$store.getters['app/getProgressStatus']
    }
  },
  methods: {
    close() {
      this.$store.commit('app/setAlert')
      this.$store.commit('app/setMessage', '')
      this.$store.commit('app/seProgressStatus')
    }
  }
}
</script>

<style lang="scss" scoped>
.snackbar {
  top: 10em;
  right: 5em;
}
</style>
