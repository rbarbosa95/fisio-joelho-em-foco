<template>
  <v-app id="accent">
    <the-snack-bar />
    <the-tool-bar :is-view="isView" :is-token-set="isTokenSet" />
    <router-view />
  </v-app>
</template>

<script>
import TheToolBar from '@/components/common/TheToolBar'
import TheSnackBar from '@/components/common/TheSnackBar'

export default {
  name: 'App',
  components: {
    TheToolBar,
    TheSnackBar
  },
  data: () => ({}),
  computed: {
    isView() {
      return this.$store.getters['app/getView']
    },
    token() {
      return this.$store.getters['auth/geToken']
    },
    isTokenSet() {
      return this.$store.getters['auth/geToken'].isTokenSet
    },
    status() {
      return this.$store.getters['app/getProgressStatus']
    }
  }
}
</script>

<style lang="scss">
address {
  font-style: normal;
}
.markdown-text {
  white-space: pre-wrap;
  h2 {
    font-size: 22px;
    font-weight: 500;
  }
  img {
    max-width: 100%;
  }
}
</style>
