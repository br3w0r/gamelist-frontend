import Vue from 'vue'
import Vuex from 'vuex'
import { allgames } from './modules/allgames'
import { auth } from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    allgames,
    auth
  }
})
