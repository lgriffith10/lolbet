import * as zod from 'zod'

export const loginFormSchema = zod.object({
  email: zod.email().min(1, 'required'),
  password: zod.string().min(1, 'required').max(20),
})
