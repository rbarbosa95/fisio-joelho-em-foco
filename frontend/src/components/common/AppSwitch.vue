<template>
  <v-switch v-model="switchApp" inset dense @change="appSwitch"></v-switch>
</template>

<script>
export default {
  name: 'AppSwitch',
  props: {
    changeSwitch: {
      type: Boolean,
      default: true
    },
    id: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    switchApp: ''
  }),
  created() {
    this.switchApp = this.changeSwitch
  },
  methods: {
    appSwitch() {
      this.$emit('appSwitch', {
        id: this.id,
        change: this.switchApp
      })
    }
  }
}
</script>

<style></style>
