export class CreateLobbyCommand {
  constructor(
    public name: string,
    public description?: string,
    public mediaId?: string
  ) {}
}
