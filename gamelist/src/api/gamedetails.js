import { ROOT_URL } from './const'
import { genericRequest } from './generic'

export const GetGameDetails = async (gameId) => {
    return genericRequest(ROOT_URL + "/api/v0/games/details", "POST", {
        id: gameId
    })
}