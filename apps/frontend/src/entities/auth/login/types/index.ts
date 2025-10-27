export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type RegisterRequest = {
  username: string
  password: string
  email: string
}

export type RegisterResponse = {}
