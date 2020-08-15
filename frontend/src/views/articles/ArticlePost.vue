<template>
  <article>
    <v-img src="@/assets/img/header-article.png" class="primary" />
    <v-container>
      <v-row justify="center">
        <v-col cols="8" class="mt-4">
          <h1 class="text-center display-2">{{ article.title }}</h1>
        </v-col>
        <v-col cols="6">
          <p class="secondary--text text-center">{{ article.preview }}</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-divider class="secondary"></v-divider>
          <div class="d-flex justify-space-between mt-3 px-5">
            <div>
              <address class="body-2 font-weight-light">
                {{ article.user.firstName }} {{ article.user.lastName }}
              </address>
              <span class="caption secondary--text">
                Publicado em {{ article.date | moment('LL') }}
              </span>
            </div>
            <v-badge
              :color="isColor"
              :content="article.likes.heart"
              overlap
              bordered
              offset-x="23px"
              offset-y="25px"
            >
              <v-btn
                class="ma-2"
                text
                icon
                :color="isColor"
                @click="vote"
                large
                :class="{ disabled: disabled }"
              >
                <v-icon>
                  mdi-heart-plus
                </v-icon>
              </v-btn>
            </v-badge>
          </div>
          <v-divider class="secondary"></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-img :src="article.sourceImage"></v-img>
        </v-col>
        <v-col cols="8">
          <vue-simple-markdown :source="article.text" class="markdown-text">
          </vue-simple-markdown>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    slug: {},
    disabled: false,
    isColor: 'secondary lighten-2'
  }),
  beforeCreate() {
    let params = this.$route.params
    this.slug = params.id.split('-')
    let value = this.slug[this.slug.length - 1]
    this.$store.dispatch('articles/getOneArticle', value)
  },
  computed: {
    article() {
      return this.$store.getters['articles/getOneArticle']
    }
  },
  methods: {
    vote() {
      this.disabled = !this.disabled
      this.isColor = this.disabled ? 'primary' : 'secondary lighten-2'
      this.$store.dispatch('articles/setHeartUp', this.article.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
}
.markdown-text {
  text-align: justify;
}
</style>
