import * as api from '@/api/gamelist'

export const gamelist = {
    namespaced: true,
    state: {
      allGames: {
        first: true,
        games: []
      },
      myGames: {
        first: true,
        games: []
      }    
    },
    mutations: {
      addGames(state, {type, games}) {
        if (state[type].first) {
          state[type].games = games
        } else {
          state[type].games.push(...games);
        }
      },
      setFirst(state, [type, value]) {
        state[type].first = value
      }
    },
    actions: {
      async getAllGames({ commit, dispatch, state }, myGames) {
        let gamesType = myGames ? 'myGames' : 'allGames'
        if (state[gamesType].first) {
          var response = await api.GetAllGames(myGames);
          
          if (!response.ok) {
            if (response.status == 401) {
              let ok = await dispatch('auth/refreshTokens', null, {root: true})
              if (ok) {
                await dispatch('getAllGames', myGames)
                return true
              } else {
                return false
              }
            }
          } else {
            commit("addGames", {
              type: gamesType,
              games: response.body
            })
            commit("setFirst", [gamesType, false])
            return true
          }
        }
        return true
      }
    }
}
