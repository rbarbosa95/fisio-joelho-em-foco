<template>
  <v-container id="articlelist">
    <h2 class="title">Últimos Artigos</h2>
    <p class="secondary--text">Aqui está o que fizemos recentemente.</p>
    <v-row>
      <v-col cols="12" sm="3" v-for="card in articles" :key="card.id">
        <v-card class="mx-auto" :to="`/artigos/${card.slug}-${card.id}`">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="card.sourceImage"
          >
          </v-img>
          <v-card-title class="subtitle-1 font-weight-regular">
            {{ card.title }}
          </v-card-title>
          <v-card-text class="secondary--text">
            <p>
              {{ card.preview }}
            </p>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions class="mx-4 text-right d-flex justify-end">
            <p class="caption secondary--text">
              {{ card.date | moment('DD, MMMM') }}
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  beforeCreate() {
    this.$store.dispatch('articles/getArticles', {
      public_eq: true
    })
  },
  computed: {
    articles: {
      get() {
        return this.$store.getters['articles/getArticles']
      },
      set(newValue) {
        return newValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#articlelist {
  .subtitle-1 {
    word-break: break-word;
    line-height: normal;
  }
}
</style>
