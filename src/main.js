import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './styles/main.scss'

Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('mouseup', el.clickOutsideEvent)
    document.body.addEventListener('touchend', el.clickOutsideEvent)
  },
  unbind(el) {
    document.body.removeEventListener('mouseup', el.clickOutsideEvent)
    document.body.removeEventListener('touchend', el.clickOutsideEvent)
  }
})

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
