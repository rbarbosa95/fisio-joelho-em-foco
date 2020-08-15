<template>
  <v-container>
    <h2 class="title">Últimos Vídeos</h2>
    <p class="secondary--text">Aqui está o que fizemos recentemente.</p>
    <v-row>
      <v-col cols="4" v-for="card in sources" :key="card.id">
        <p class="subtitle-1 secondary--text">{{ card.title }}</p>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto" raised @click="modal(card.youtubeUrl)">
              <v-img
                :src="
                  `https://img.youtube.com/vi/${card.youtubeUrl}/hqdefault.jpg`
                "
              />
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="primary">
                  <v-btn class="ma-2" icon color="white" x-large>
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      width="560"
      @click="modal(false)"
      @click:outside="modal(false)"
    >
      <v-card>
        <youtube
          :video-id="content"
          player-width="560"
          :player-vars="{ autoplay: 1 }"
          @ready="ready"
        ></youtube>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="modal(false)">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: 'Home',
  data: () => ({
    overlay: false,
    dialog: false,
    content: '',
    player: ''
  }),
  beforeCreate() {
    this.$store.dispatch('videos/getVideos', {
      public_eq: true
    })
  },
  computed: {
    sources() {
      return this.$store.getters['videos/getListVideos']
    }
  },
  methods: {
    ready(event) {
      this.player = event.target
    },
    modal(payload) {
      this.content = payload ? payload : ''
      this.dialog = !this.dialog
      if (!this.dialog) {
        this.player.stopVideo()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
