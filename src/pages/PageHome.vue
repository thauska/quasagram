<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
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
      posts: [
        {
          id: 1,
          caption: "Golden Gate Bridge",
          date: 1617389167045,
          location: "Belém/PA, Brazil",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 2,
          caption: "Golden Gate Bridge",
          date: 1617389167045,
          location: "Belém/PA, Brazil",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 3,
          caption: "Golden Gate Bridge",
          date: 1617389167045,
          location: "Belém/PA, Brazil",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 4,
          caption: "Golden Gate Bridge",
          date: 1617389167045,
          location: "Belém/PA, Brazil",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
      ],
    };
  },
  filters: {
    dateFormatted(value) {
      return date.formatDate(value, "D MMM YY, HH:mm");
    },
  },
};
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
