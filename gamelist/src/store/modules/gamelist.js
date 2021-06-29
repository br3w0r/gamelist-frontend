import * as api from '../../api/gamelist'

export const gamelist = {
    state: {
      games: []
    },
    mutations: {
      addGames(state, games) {
        state.games.push(...games);
      }
    },
    actions: {
      async getAllGames({ commit }) {
        var response = await api.GetAllGames();
        
        if (!response.ok) {
          console.log("!!! Bad status: " + response.status);
        } else {
          commit("addGames", response.body)
        }
      }
    }
}
