<template>
  <v-dialog
    v-model="dialog"
    lazy
    persistent
    :max-width="485"
    @keydown.esc="cancel"
  >
    <v-card class="pa-3">
      <v-card-title class="headline font-weight-bold justify-center">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-xs-center">
        {{ message }}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          v-if="type === 'confirm'"
          class="text-none"
          color="primary darken-3"
          round
          @click.native="cancel"
        >
          No
        </v-btn>
        <v-btn
          class="text-none"
          color="primary darken-3"
          round
          @click.native="agree"
        >
          {{ type === 'confirm' ? 'Yes' : 'OK' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * Vuetify-based dialog component with easy JS API and reusable interface
 *
 * Insert component where you want to use a dialog
 * <app-dialog ref="dialog" />
 *
 * Call it:
 *
 * this.$refs.dialog.open({
 *     title: 'Unsaved edit',
 *     message: 'Save your note before leaving'
 * })
 *
 * This returns a promise that gets resolved when user OKs or cancels the dialog.
 * Or, when the user clicks the ESC button.
 *
 * const response = await this.$refs.dialog.open({ title: '', message: ''})
 *
 * If user clicks OK/Yes, response will be true
 * If user clicks No, response will be false
 */
export default {
  name: 'Dialog',
  data: () => ({
    title: null,
    type: 'alert',
    dialog: false,
    reject: null,
    resolve: null,
    message: null
  }),
  methods: {
    open({ title, message, type = 'alert' }) {
      this.dialog = true

      this.type = type
      this.title = title
      this.message = message

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },

    agree() {
      this.resolve(true)
      this.dialog = false
    },

    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
}
</script>
