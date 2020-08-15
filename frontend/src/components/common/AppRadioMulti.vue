<template>
  <v-radio-group v-model="radio" :disabled="disabled" required :row="row">
    <v-radio
      v-for="(value, key) in data"
      :key="key"
      :label="value"
      :value="`reply${key + 1}`"
      class="text-lowercase"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'AppRadioMulti',
  props: {
    question: {
      type: String,
      default: 'reply1',
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    row: {
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
        return newValue
      }
    }
  }
}
</script>

<style></style>
