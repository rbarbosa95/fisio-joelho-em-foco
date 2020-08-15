<template>
  <v-radio-group v-model="radio" :disabled="disabled" row required>
    <v-radio label="Não" :value="false"></v-radio>
    <v-radio label="Sim" :value="true"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'AppRadioBoolean',
  props: {
    question: {
      type: Boolean,
      default: false,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    radio: {
      get() {
        return this.question
      },
      set(newValue) {
        this.$emit('changeRadio', newValue, this.value)
        this.value
        return newValue
      }
    }
  }
}
</script>

<style></style>
