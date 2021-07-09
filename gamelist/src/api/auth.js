import { ROOT_URL } from './const'
import { genericRequest } from './generic';

export const SignUp = async (creds) => {
    return genericRequest(ROOT_URL + '/api/v0/profiles', 'POST', creds)
}

export const GetTokens = async (creds) => {
    return genericRequest(ROOT_URL + "/api/v0/aquire-tokens", "POST", creds)
}

export const RefreshTokens = async (refreshToken) => {
    return genericRequest(ROOT_URL + "/api/v0/refresh-tokens", "POST", {
        "refresh_token": refreshToken
    })
}
