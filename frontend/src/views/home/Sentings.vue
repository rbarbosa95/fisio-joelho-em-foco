<template>
  <v-container grid-list-xs>
    <v-row>
      <h3>sentings</h3>
      {{ this.value }}
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'sentings',
  data: () => ({
    value: 'aaaaaaa'
  })
}
</script>

<style lang="scss" scoped></style>
