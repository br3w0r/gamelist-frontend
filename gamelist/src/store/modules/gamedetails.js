import * as api from '@/api/gamedetails'

export const gamedetails = {
    namespaced: true,
    state: {
        show: false,
        game: {
            "id": 1,
            "name": "The Legend of Zelda: Ocarina of Time",
            "image_url": "https://static.metacritic.com/images/products/games/2/70c7a7d5ef1a36a69018111cc1478f30-98.jpg",
            "year_released": 1998,
            "user_list": 0
        },
        platforms: [
            {
                "name": "Nintendo 64"
            },
            {
                "name": "Dickgame 1000"
            },
            {
                "name": "Dickgame 1000"
            },
            {
                "name": "Dickgame 1000"
            },
            {
                "name": "Dickgame 1000"
            }
        ],
        genres: [
            {
                "name": "Action Adventure"
            },
            {
                "name": "Fantasy"
            },
        ]
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
                return false
            }
            commit("addDetails", response.body);
            return true
        }
    }
}