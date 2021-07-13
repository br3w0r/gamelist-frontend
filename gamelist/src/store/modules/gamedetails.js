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
                console.log("failed to get game details: " + response.status + " : " + JSON.stringify(response.body));
                return response.status
            }
            commit("addDetails", response.body);
            return true
        }
    }
}