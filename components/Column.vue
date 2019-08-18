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
          <v-list-tile @click="$emit('delete', subreddit)">
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile>
          <v-divider />
          <v-list-tile @click="showSearch = true">
            <v-list-tile-title>Search</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="refresh">
            <v-list-tile-title>Refresh</v-list-tile-title>
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
              v-for="post in getBookmarksBySubreddit(subreddit)"
              :key="post.id"
              :post="post"
              is-bookmark
              @remove-bookmark="removeBookmark({ post, subreddit })"
            />

            <post
              v-for="{ data: post } in filterPosts(posts)"
              :key="post.id"
              :post="post"
              @add-bookmark="addBookmark({ post, subreddit })"
            />
          </div>
        </v-slide-y-reverse-transition>
      </template>
    </Promised>
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Post from '~/components/Post.vue'
import { API_BASE_URL } from '~/constants'

const Reddit = namespace('reddit')

@Component({
  name: 'Column',
  components: { Post }
})
export default class Subreddit extends Vue {
  @Prop({ type: String, required: true })
  subreddit: string

  @Reddit.Getter isBookmarked

  @Reddit.Getter getBookmarksBySubreddit

  @Reddit.Action addBookmark

  @Reddit.Action removeBookmark

  postsPromise: any = null

  searchQuery = ''

  showSearch = false

  fuse = null

  mounted() {
    this.refresh()
  }

  refresh() {
    const url = `${API_BASE_URL}${this.subreddit}.json`

    this.postsPromise = this.$axios.get(url)
  }

  filterPosts(posts) {
    const nonbookmarkedPosts = posts.filter(({ data: post }) => {
      return !this.isBookmarked({ post, subreddit: this.subreddit })
    })

    if (this.searchQuery === '') {
      return nonbookmarkedPosts
    }

    const options = {
      keys: ['data.title']
    }

    const fuse = new Fuse(nonbookmarkedPosts, options)

    return fuse.search(this.searchQuery)
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
