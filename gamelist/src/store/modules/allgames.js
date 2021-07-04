import * as api from '@/api/gamelist'

export const allgames = {
    namespaced: true,
    state: {
      first: true,
      games: []
    },
    mutations: {
      addGames(state, games) {
        state.games.push(...games);
      },
      setFirst(state) {
        state.first = false
      }
    },
    actions: {
      async getAllGames({ commit, state }) {
        if (state.first) {
          var response = await api.GetAllGames();
          
          if (!response.ok) {
            console.log("!!! Bad status: " + response.status);
          } else {
            commit("addGames", response.body)
            commit("setFirst")
          }
        }
      }
    }
}
