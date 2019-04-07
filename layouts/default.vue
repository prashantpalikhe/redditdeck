<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      :value="true"
      mini-variant
      hide-overlay
      stateless
      fixed
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="~/assets/image/icon.png" />
            </v-list-tile-avatar>

            <v-spacer />

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider />

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          tag="a"
          nuxt
          :href="item.href"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-slide-x-reverse-transition>
        <nuxt />
      </v-slide-x-reverse-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const App = namespace('app')

@Component
export default class DefaultLayout extends Vue {
  @App.State dark

  items = [
    { title: 'Home', icon: 'home', href: '#/' },
    { title: 'Settings', icon: 'settings', href: '#/settings' }
  ]
}
</script>

<style>
html {
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
}
</style>
