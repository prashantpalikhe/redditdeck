<template>
  <v-card :href="post.url" tag="a" flat class="post" v-on="on">
    <v-card-title>
      <div :href="post.url" noopener target="_blank" class="pa-2 body-1">
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
      </div>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'Post'
})
export default class Post extends Vue {
  @Prop({ type: Object, required: true })
  post: object

  popover = false
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
