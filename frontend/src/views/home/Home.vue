<template>
  <div>
    <progress-status />
    <div id="bar"></div>
    <v-container class="content">
      <v-row justify="center">
        <v-col cols="10" class="d-flex justify-space-between">
          <div>
            <h2 class="display-1 font-weight-light white--text">
              {{ getName }}
            </h2>
            <p class="font-weight-light white--text">
              Configurações para {{ getEmail }}
            </p>
          </div>
          <v-btn color="white oopacity" @click="logout()" x-large>
            Sair da conta
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3">
          <v-card class="py-4 px-2">
            <home-list-nav :role-type="getRoleType" :items="items" />
          </v-card>
        </v-col>
        <v-col cols="7">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProgressStatus from '@/components/common/ProgressStatus'
import HomeListNav from '@/components/home/HomeListNav'

export default {
  name: 'Home',
  components: {
    ProgressStatus,
    HomeListNav
  },
  data: () => ({
    items: [
      {
        text: 'Geral',
        link: 'home',
        permission: ['customer', 'authenticated', 'physiotherapy']
      },
      {
        text: 'Usuários',
        link: 'users',
        permission: ['authenticated']
      },
      {
        text: 'Pacientes',
        link: 'customer',
        permission: ['physiotherapy']
      },
      {
        text: 'Artigos',
        link: 'articles',
        permission: ['authenticated']
      },
      {
        text: 'Questionário de Funcionalidade',
        link: 'questions',
        permission: ['customer']
      },
      {
        text: 'Videos',
        link: 'media',
        permission: ['authenticated']
      },
      {
        text: 'Escala de dor',
        link: 'painscale',
        permission: ['customer']
      },
      {
        text: 'Escala de Humor',
        link: 'moodscale',
        permission: ['customer']
      },
      {
        text: 'Google Meet',
        link: 'meet',
        permission: ['customer']
      },
      {
        text: 'Google Meet - Fisio',
        link: 'meetfisio',
        permission: ['physiotherapy']
      }
    ]
  }),
  beforeMount() {
    this.$store.dispatch('auth/profile')
  },
  computed: {
    token() {
      return this.$store.getters['auth/geToken']
    },
    user() {
      return this.$store.getters['auth/getuser']
    },
    snack() {
      return this.$store.getters['app/getAlert']
    },
    getName() {
      return this.user?.firstName + ' ' + this.user?.lastName
    },
    getEmail() {
      return this.user?.email
    },
    getRoleType() {
      return this.user?.role?.type
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$store.commit('app/seProgressStatus', 'info')
      this.$store.commit('app/setAlert')
      this.$store.commit('app/setMessage', 'Deslogando do sistema')
    }
  }
}
</script>

<style lang="scss" scoped>
#bar {
  display: flex;
  width: 100vw;
  background-color: #1b2a4e;
  height: 150px;
}
.content {
  position: relative;
  bottom: 8.5em;
  .oopacity {
    opacity: 0.25;
  }
}
</style>
