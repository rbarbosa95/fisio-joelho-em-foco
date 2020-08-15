<template>
  <v-container v-show="isView">
    <v-app-bar flat color="white" max-height="85" class="my-10">
      <v-toolbar-title>
        <router-link to="/">
          <img src="@/assets/svg/logo.svg" alt="Logo" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          x-large
          to="/videos"
          color="tertiary"
          class="text-capitalize font-weight-regular"
          active-class="font-weight-medium transparent"
        >
          Vídeos
        </v-btn>
        <v-btn
          text
          x-large
          to="/artigos"
          color="tertiary"
          class="text-none font-weight-regular"
          active-class="font-weight-medium"
        >
          Entenda a sua dor
        </v-btn>
        <v-btn
          text
          x-large
          to="/login"
          color="info"
          class="text-none font-weight-regular"
          active-class="font-weight-medium"
          v-if="!isTokenSet"
        >
          Login
        </v-btn>
        <v-btn
          text
          x-large
          to="/home"
          color="tertiary"
          class="text-none font-weight-regular"
          active-class="font-weight-medium"
          v-if="isTokenSet"
        >
          Conta
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: 'TheToolBar',
  props: {
    isView: {
      type: Boolean,
      default: true
    },
    isTokenSet: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
