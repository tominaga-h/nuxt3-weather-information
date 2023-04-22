import { h } from 'vue'
import { VClassIcon } from 'vuetify/lib/composables/icons'

export const wi = {
  component: (props) => {
    return h(VClassIcon, {
      ...props,
      class: 'wi',
    })
  },
}
