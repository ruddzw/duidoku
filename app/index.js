import Vue from 'vue'
import store from 'store'
import App from 'components/App'

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('mouseup', el.clickOutsideEvent)
    document.body.addEventListener('touchend', el.clickOutsideEvent)
  },
  unbind (el) {
    document.body.removeEventListener('mouseup', el.clickOutsideEvent)
    document.body.removeEventListener('touchend', el.clickOutsideEvent)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({ // eslint-disable-line no-new
    el: '#app-container',
    store,
    render: h => h(App)
  })
})
