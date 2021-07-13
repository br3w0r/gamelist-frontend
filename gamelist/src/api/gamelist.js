import { ROOT_URL } from './const'
import { genericRequest } from './generic'

export const GetAllGames = async (myGames) => {
    let path = myGames ? "/api/v0/my-games" : "/api/v0/games/all";
    return genericRequest(ROOT_URL + path, "GET")
}

export const ListGame = async (data) => {
    return genericRequest(ROOT_URL + "/api/v0/list-game", "POST", data)
}

export const SearchGames = async (name) => {
    return genericRequest(ROOT_URL + "/api/v0/games/search", "POST", {
        name
    })
}
