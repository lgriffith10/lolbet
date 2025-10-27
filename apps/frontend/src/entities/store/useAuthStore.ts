import { defineStore } from 'pinia'

type AuthStoreState = {
  token?: string
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => {
    return {
      token: undefined,
      isAuthenticated: false,
    }
  },
  actions: {
    setToken(token?: string) {
      this.token = token
    },
    setIsAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated
    },
  },
})
