import vine from '@vinejs/vine'

export const createLobbyValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(4).maxLength(64),
    description: vine.string().maxLength(128),
  })
)
