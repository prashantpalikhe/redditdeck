<template>
  <a
    :href="post.url"
    noopener
    target="_blank"
    class="white--text post body-1 pa-4"
  >
    {{ post.title }}

    <div>
      <div class="caption grey--text">{{ post.author }}</div>
      <a
        :href="`https://reddit.com${post.permalink}`"
        noopener
        target="_blank"
        class="caption"
        >Link to comments</a
      >
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'Post'
})
export default class Post extends Vue {
  @Prop({ type: Object, required: true })
  post: object
}
</script>

<style lang="stylus" scoped>
.post {
  display: block;
  text-decoration: none;

  a {
    text-decoration: none;
  }
}
</style>
