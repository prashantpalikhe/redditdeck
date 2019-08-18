<template>
  <v-card
    :href="post.url"
    :class="{ 'is-bookmark': isBookmark }"
    tag="a"
    flat
    class="post"
    rel="noopener noreferrer"
    target="_blank"
  >
    <v-card-title>
      <div class="pa-2 pr-3 body-2">
        {{ post.title }}

        <div>
          <div class="caption grey--text">{{ post.author }}</div>
          <a
            :href="`https://reddit.com${post.permalink}`"
            rel="noopener noreferrer"
            target="_blank"
            class="caption"
            >Link to comments</a
          >
        </div>

        <v-btn
          v-if="isBookmark"
          class="post__bookmark is-visible"
          icon
          @click.prevent="removeBookmark"
        >
          <v-icon :size="16">bookmark</v-icon>
        </v-btn>

        <v-btn v-else class="post__bookmark" icon @click.prevent="addBookmark">
          <v-icon :size="16">bookmark_border</v-icon>
        </v-btn>
      </div>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'Post'
})
export default class Post extends Vue {
  @Prop({ type: Object, required: true })
  readonly post: object

  @Prop({ type: Boolean, default: false })
  readonly isBookmark: boolean

  @Emit()
  addBookmark() {}

  @Emit()
  removeBookmark() {}
}
</script>

<style lang="stylus" scoped>
.post {
  position: relative;
  display: block;
  text-decoration: none;

  &:hover .post__bookmark {
    opacity: 1;
  }

  .post__bookmark {
    transition: opacity 0.25s ease;
    opacity: 0;
    position: absolute;
    top: 12px;
    right: 0;

    &.is-visible {
      opacity: 1;
    }
  }

  a {
    text-decoration: none;
  }
}
</style>
