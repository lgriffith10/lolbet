type CreateLobbyResponsePayload = {
  id: string
}

export class CreateLobbyResponse {
  constructor(public readonly data: CreateLobbyResponsePayload) {}
}
