type RegisterResponsePayload = {
  userId: string
}

export class RegisterResponse {
  constructor(public readonly data: RegisterResponsePayload) {}
}
