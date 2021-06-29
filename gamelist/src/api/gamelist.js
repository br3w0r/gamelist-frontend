import { ROOT_URL, BASIC_HEADERS } from './const'

export const GetAllGames = async () => {
    var response = await fetch(ROOT_URL + '/api/v0/games/all', {
        method: 'GET',
        headers: BASIC_HEADERS,
    });
    return {
        ok: response.ok,
        status: response.status,
        body: await response.json()
    };
}
