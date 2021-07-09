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
      async getAllGames({ commit, dispatch, state }) {
        if (state.first) {
          var response = await api.GetAllGames();
          
          if (!response.ok) {
            if (response.status == 401) {
              let ok = await dispatch('auth/refreshTokens', null, {root: true})
              if (ok) {
                dispatch('getAllGames')
              } else {
                return false
              }
            }
          } else {
            commit("addGames", response.body)
            commit("setFirst")
            return true
          }
        }
      }
    }
}
