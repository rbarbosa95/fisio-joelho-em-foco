<template>
  <v-list>
    <v-subheader>
      {{ getPermission }}
    </v-subheader>
    <v-list-item-group color="primary" v-model="model">
      <v-list-item v-for="(item, key) in getItemPermission" :key="key">
        <v-list-item-content>
          <v-list-item-title class="body-2" @click="goTo(item.link)">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'HomeListNav',
  props: {
    roleType: {
      type: String,
      default: ''
    },
    items: {
      type: Array
    }
  },
  data: () => ({
    model: ''
  }),
  computed: {
    getPermission() {
      return this.permission(this.roleType)
    },
    getItemPermission() {
      return this.items.filter(item => {
        return item.permission.indexOf(this.roleType) !== -1
      })
    }
  },
  methods: {
    goTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route })
      }
    },
    permission(key) {
      let name
      switch (key) {
        case 'authenticated':
          name = 'Conta Administrador'
          break
        case 'physiotherapy':
          name = 'Conta Fisioteraupeta'
          break
        case 'customer':
          name = 'Conta'
          break
      }
      return name
    }
  }
}
</script>

<style></style>
