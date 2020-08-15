<template>
  <v-progress-linear
    :value="value"
    :color="status"
    height="3px"
    :indeterminate="indeterminate"
    buffer-value="100"
  />
</template>

<script>
export default {
  name: 'ProgressStatus',
  computed: {
    indeterminate() {
      return this.$store.getters['app/getProgressIndeterminate']
    },
    value() {
      return this.$store.getters['app/getProgressValue']
    },
    status() {
      return this.$store.getters['app/getProgressStatus']
    }
  }
}
</script>

<style lang="scss" scoped></style>
