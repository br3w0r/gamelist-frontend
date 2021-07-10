import { stringIsEmail } from "@/misc/helpers.js"
import * as api from '@/api/auth.js'

export const auth = {
  namespaced: true,
  actions: {
    async signUp({ dispatch }, creds) {
      let response = await api.SignUp(creds)
      if (response.ok) {
        await dispatch('getTokens', {
          user: creds.email,
          password: creds.password
        })
        return true
      }
      console.log(`Sign up error: ${response.status}: ${JSON.stringify(response.body)}`)
      return false
    },
    async getTokens(context, {user, password}) {
      let data = {
        password
      };
      let isEmail = stringIsEmail(user)
      if (isEmail) {
        data.email = user
      } else {
        data.nickname = user
      }

      let response = await api.GetTokens(data)
      if (response.ok) {
        localStorage.setItem('token', response.body.token)
        localStorage.setItem('refresh_token', response.body['refresh_token'])
        return true
      }
      console.log(`Get tokens error: ${response.status}: ${JSON.stringify(response.body)}`)
      return false
    },
    async refreshTokens() {
      let refreshToken = localStorage.getItem('refresh_token')
      let response = await api.RefreshTokens(refreshToken)
      if (response.ok) {
        localStorage.setItem('token', response.body.token)
        localStorage.setItem('refresh_token', response.body['refresh_token'])
        return true
      }
      console.log(`Refresh tokens error: ${response.status}: ${JSON.stringify(response.body)}`)
      return false
    },
    async signOut() {
      let refreshToken = localStorage.getItem('refresh_token');
      let response = await api.RevokeRefreshToken(refreshToken);
      if (!response.ok) {
        console.log('failed to make revoke refresh token request: ' + response.status + ' : ' + response.body)
        return false
      }
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      return true
    }
  }
}
