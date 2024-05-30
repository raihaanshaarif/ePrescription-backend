// onExamination.validation.ts

import { z } from 'zod'

const createOnExaminationZodSchema = z.object({
  body: z
    .object({
      nameEnglish: z.string().optional(),
      nameBangla: z.string().optional(),
    })
    .refine(data => data.nameEnglish || data.nameBangla, {
      message: 'Either nameEnglish or nameBangla must be provided',
    }),
})

const updateOnExaminationZodSchema = z.object({
  body: z
    .object({
      nameEnglish: z.string().optional(),
      nameBangla: z.string().optional(),
    })
    .refine(data => data.nameEnglish || data.nameBangla, {
      message: 'Either nameEnglish or nameBangla must be provided',
    }),
})

export const OnExaminationValidation = {
  createOnExaminationZodSchema,
  updateOnExaminationZodSchema,
}
