<template>
  <div ref="subredditsContainer" class="subreddits">
    <column
      v-for="subreddit in subreddits"
      :key="subreddit"
      :id="subreddit"
      :subreddit="subreddit"
      @delete="deleteSubreddit($event)"
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
  @Reddit.Action deleteSubreddit
  @Reddit.Action setSubreddits

  draggable

  mounted() {
    this.draggable = dragula([this.$refs.subredditsContainer], {
      direction: 'horizontal',
      moves: function(_, __, handle) {
        return handle.classList.contains('handle')
      }
    })

    this.draggable.on('drop', this.saveNewOrder.bind(this))
  }

  beforeDestroy() {
    this.draggable.destroy()
  }

  saveNewOrder() {
    const subreddits = [...this.draggable.containers[0].children].map(x => x.id)

    this.setSubreddits(subreddits)
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
