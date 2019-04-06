<template>
  <div ref="subredditsContainer" class="subreddits">
    <column
      v-for="subreddit in subreddits"
      :key="subreddit"
      :subreddit="subreddit"
    />
  </div>
</template>

<script lang="ts">
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Column from '~/components/Column.vue'

const Reddit = namespace('reddit')

@Component({
  components: { Column }
})
export default class Home extends Vue {
  @Reddit.State subreddits

  mounted() {
    dragula([this.$refs.subredditsContainer], {
      direction: 'horizontal',
      moves: function(_, __, handle) {
        return handle.classList.contains('handle')
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.subreddits {
  height: 100vh;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
