import Vue from 'vue'
import Vuex from 'vuex'
import { ListGame, SearchGames } from '../api/gamelist'
import { gamelist } from './modules/gamelist'
import { gamedetails } from './modules/gamedetails'
import { auth } from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gamelist,
    gamedetails,
    auth
  },
  state: {
    listTypes: [
      {
        id: 1,
        name: "Played"
      },
      {
        id: 2,
        name: "Playing"
      },
      {
        id: 3,
        name: "Want to play"
      },
      {
        id: 0,
        name: "Unlist"
      }
    ],
    listTypeToIcon: [
      "mdi-star-outline",
      "mdi-check",
      "mdi-reload",
      "mdi-star"
    ],
    
    searchEntries: []
  },
  mutations: {
    setSearchEntries(state, entries) {
      state.searchEntries = entries;
    }
  },
  actions: {
    async listGame({ commit }, data) {
      let game = data.game;
      delete data.game;
      data['game_id'] = game.id;
      let response = await ListGame(data);
      if (!response.ok) {
        console.log("listGame bad status: " + response.status + " : " + JSON.stringify(response.body));
        return false
      }

      commit('gamelist/setFirst', ['myGames', true])
      return true
    },
    async searchGames({ commit, dispatch }, name) {
      let response = await SearchGames(name)
      if (!response.ok) {
        if (response.status == 401) {
          let ok = await dispatch('auth/refreshTokens', null, {root: true})
          if (ok) {
            await dispatch('searchGames')
            return true
          } else {
            return false
          }
        } else {
          console.log("searchGames bad status: " + response.status + " : " + JSON.stringify(response.body))
          return false
        }
      }
      commit('setSearchEntries', response.body)
    }
  }
})
