<template>
  <div>
    <v-toolbar>
      <v-btn icon round nuxt href="#/">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            ref="select"
            v-model="subr"
            label="Add the subreddits that you want in the deck"
            multiple
            chips
            tags
            deletable-chips
            append-icon
            browser-autocomplete="off"
            class="elevation-0"
          />
          <v-switch v-model="darkMode" label="Dark mode" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Reddit = namespace('reddit')
const App = namespace('app')

@Component
export default class Home extends Vue {
  @App.Action setDarkMode

  @Reddit.Action setSubreddits

  @App.State dark

  @Reddit.State subreddits

  get subr() {
    return this.subreddits
  }

  set subr(value) {
    this.setSubreddits(value)
  }

  get darkMode() {
    return this.dark
  }

  set darkMode(value) {
    this.setDarkMode(value)
  }

  maskTags(event) {
    const mask = /^[a-zA-Z0-9=:_-]+$/g
    const input = event.key
    const isSpace = event.key === ' '
    const isComma = event.key === ','

    if (!mask.test(input)) {
      event.preventDefault()
    }

    if (isSpace || isComma) {
      ;(this.$refs.select as any).onEnterDown()
    }
  }
}
</script>
