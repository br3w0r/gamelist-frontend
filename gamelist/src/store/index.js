import Vue from 'vue'
import Vuex from 'vuex'
import { gamelist } from './modules/gamelist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gamelist
  }
})
