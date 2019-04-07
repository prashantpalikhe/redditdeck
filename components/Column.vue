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
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile @click="onDeleteClick">
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
        <v-text-field
          v-model.trim="searchQuery"
          hide-details
          prepend-icon="search"
          single-line
        />
        <v-btn icon @click="clearSearch">
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
              v-for="{ data: post } in filterPosts(posts)"
              :key="post.title"
              :post="post"
            />
          </div>
        </v-slide-y-reverse-transition>
      </template>
    </Promised>

    <confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Post from '~/components/Post.vue'
import ConfirmDialog from '~/components/Dialog.vue'

@Component({
  name: 'Column',
  components: { Post, ConfirmDialog }
})
export default class Subreddit extends Vue {
  @Prop({ type: String, required: true })
  subreddit: string

  postsPromise: any = null

  searchQuery = ''
  showSearch = false

  fuse = null

  mounted() {
    this.postsPromise = this.$axios.get(
      `https://cors-anywhere.herokuapp.com/https://reddit.com/r/${
        this.subreddit
      }.json`
    )
  }

  filterPosts(posts) {
    if (this.searchQuery === '') {
      return posts
    }

    const options = {
      keys: ['data.title']
    }

    const fuse = new Fuse(posts, options)

    return fuse.search(this.searchQuery)
  }

  async onDeleteClick() {
    const confirmed = await (this.$refs.confirmDialog as any).open({
      title: 'Remove column',
      message: `Are you sure you want to remove /r/${this.subreddit}`,
      type: 'confirm'
    })

    if (confirmed) {
      this.$emit('delete', this.subreddit)
    }
  }

  clearSearch() {
    this.showSearch = false
    this.searchQuery = ''
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
