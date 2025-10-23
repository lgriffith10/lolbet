export class CreateLobbyCommand {
  constructor(
    public name: string,
    public description: string | null,
    public mediaId: string | null
  ) {}
}
