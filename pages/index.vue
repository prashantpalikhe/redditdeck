<template>
  <div ref="subredditsContainer" class="subreddits">
    <column
      v-for="subreddit in subreddits"
      :id="subreddit"
      :key="subreddit"
      :subreddit="subreddit"
      @delete="confirmAndDelete"
    />

    <confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script lang="ts">
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Column from '~/components/Column.vue'
import ConfirmDialog from '~/components/Dialog.vue'

const Reddit = namespace('reddit')

@Component({
  components: { Column, ConfirmDialog }
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
    const subreddits = [...this.draggable.containers[0].children]
      .map(x => x.id)
      .filter(x => !!x)

    this.setSubreddits(subreddits)
  }

  async confirmAndDelete(subreddit) {
    const confirmed = await (this.$refs.confirmDialog as any).open({
      title: 'Remove column',
      message: `Are you sure you want to remove /r/${subreddit}`,
      type: 'confirm'
    })

    if (confirmed) {
      this.deleteSubreddit(subreddit)
    }
  }
}
</script>

<style lang="stylus" scoped>
.subreddits {
  height: 100vh;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  overscroll-behavior: contain;
}
</style>
