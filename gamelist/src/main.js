import Vue from 'vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
