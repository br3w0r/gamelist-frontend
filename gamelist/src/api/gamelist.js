import { ROOT_URL } from './const'
import { genericRequest } from './generic'

export const GetAllGames = async (myGames, last, batch_size) => {
    if (myGames) {
        return genericRequest(ROOT_URL + "/api/v0/my-games", "GET")
    }
    return genericRequest(ROOT_URL + "/api/v0/games/all", "POST", {
        last,
        batch_size
    })
}

export const ListGame = async (data) => {
    return genericRequest(ROOT_URL + "/api/v0/list-game", "POST", data)
}

export const SearchGames = async (name) => {
    return genericRequest(ROOT_URL + "/api/v0/games/search", "POST", {
        name
    })
}
