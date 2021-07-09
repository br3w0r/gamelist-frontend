import { ROOT_URL } from './const'
import { genericRequest } from './generic'

export const GetAllGames = async () => {
    return genericRequest(ROOT_URL + "/api/v0/games/all", "GET")
}
