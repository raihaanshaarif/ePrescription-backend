// doses.validation.ts

import { z } from 'zod'

const createDosesZodSchema = z.object({
  body: z
    .object({
      nameEnglish: z.string().optional(),
      nameBangla: z.string().optional(),
    })
    .refine(data => data.nameEnglish || data.nameBangla, {
      message: 'Either nameEnglish or nameBangla must be provided',
    }),
})

const updateDosesZodSchema = z.object({
  body: z
    .object({
      nameEnglish: z.string().optional(),
      nameBangla: z.string().optional(),
    })
    .refine(data => data.nameEnglish || data.nameBangla, {
      message: 'Either nameEnglish or nameBangla must be provided',
    }),
})

export const DosesValidation = {
  createDosesZodSchema,
  updateDosesZodSchema,
}
