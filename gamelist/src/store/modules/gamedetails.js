import * as api from '@/api/gamedetails'

export const gamedetails = {
    namespaced: true,
    state: {
        show: false,
        game: {},
        platforms: [],
        genres: []
    },
    mutations: {
        addDetails(state, {game, platforms, genres}) {
            state.game = game;
            state.platforms = platforms;
            state.genres = genres;
        }
    },
    actions: {
        async getGameDetails({ commit }, gameId) {
            let response = await api.GetGameDetails(gameId);
            if (!response.ok) {
                if (response.status == 401) {
                    let ok = await dispatch('auth/refreshTokens', null, {root: true})
                    if (ok) {
                        await dispatch('getGameDetails', myGames)
                        return true
                    } else {
                        return false
                    }
                } else {
                    console.log("failed to get game details: " + response.status + " : " + JSON.stringify(response.body));
                    return response.status
                }
            }
            commit("addDetails", response.body);
            return true
        }
    }
}