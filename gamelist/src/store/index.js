import Vue from 'vue'
import Vuex from 'vuex'
import { ListGame } from '../api/gamelist'
import { gamelist } from './modules/gamelist'
import { auth } from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
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
    ]
  },
  modules: {
    gamelist,
    auth
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
    }
  }
})
