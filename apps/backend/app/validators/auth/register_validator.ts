import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4).maxLength(64),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(64),
  })
)
