<template>
  <div class="column">
    <v-toolbar flat height="60">
      <v-btn icon>
        <v-icon class="column__handle handle">menu</v-icon>
      </v-btn>
      <v-toolbar-title>/r/{{ subreddit }}</v-toolbar-title>
      <v-spacer />
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile @click="$emit('delete')">
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="showSearch = true">
            <v-list-tile-title>Search</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-slide-y-reverse-transition>
      <v-toolbar v-if="showSearch">
        <v-text-field hide-details prepend-icon="search" single-line />
        <v-btn icon @click="showSearch = false">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-toolbar>
    </v-slide-y-reverse-transition>

    <Promised :promise="postsPromise">
      <template #pending>
        <v-progress-linear :height="1" :indeterminate="true" class="ma-0" />
      </template>

      <template #default="{ data: {data: {children: posts = []}} }">
        <v-slide-y-reverse-transition>
          <div class="column__list">
            <post
              v-for="{ data: post } in posts"
              :key="post.title"
              :post="post"
            />
          </div>
        </v-slide-y-reverse-transition>
      </template>
    </Promised>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Post from '~/components/Post.vue'

@Component({
  name: 'Column',
  components: { Post }
})
export default class Subreddit extends Vue {
  @Prop({ type: String, required: true })
  subreddit: string

  postsPromise: any = null

  showSearch: boolean = false

  mounted() {
    this.postsPromise = this.$axios.get(
      `https://cors-anywhere.herokuapp.com/https://reddit.com/r/${
        this.subreddit
      }.json`
    )
  }
}
</script>

<style lang="stylus" scoped>
.column {
  width: 320px;
  min-width: 320px;
  height: 100vh;
  overflow: hidden;
}

.column__list {
  height: calc(100vh - 60px);
  overflow: auto;
}

.column__handle {
  cursor: move;
}
</style>
