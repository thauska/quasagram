<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loading && posts.length">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="card-post q-mb-md"
            bordered
            flat
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    src="https://pt.gravatar.com/userimage/158134743/44e52501cbaafbb65c15b58f2e1ba8fb.jpg"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">thayanacmamore</q-item-label>
                <q-item-label caption> {{ post.location }} </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-img :src="post.imageUrl" />

            <q-card-section>
              <div>{{ post.caption }}</div>
              <div class="text-caption text-grey">
                {{ post.date | dateFormatted }}
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else-if="!loading && !posts.length">
          <h5 class="text-center text-grey">
            Não há postagens.
          </h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </template>
        <q-dialog v-model="dialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Erro!</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Não foi possível carregar as postagens.
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img
                src="https://pt.gravatar.com/userimage/158134743/44e52501cbaafbb65c15b58f2e1ba8fb.jpg"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">thayanacmamore</q-item-label>
            <q-item-label caption> Thayana Corrêa Mamoré </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "PageHome",
  data() {
    return {
      posts: [],
      dialog: false,
      loading: false
    }
  },
  methods: {
    getPosts() {
      this.loading = true
      this.$axios.get(`${ process.env.API }/posts`).then(res => {
        // console.log('response: ', res)
        this.posts = res.data
        this.loading = false
      }).catch(err => {
        console.log('error: ', err)
        this.dialog = true
        this.loading = false
      })
    }
  },
  filters: {
    dateFormatted(value) {
      return date.formatDate(value, "D MMM YY, HH:mm")
    },
  },
  created() {
    this.getPosts()
  }
}
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
