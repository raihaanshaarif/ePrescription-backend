// chiefComplaint.validation.ts

import { z } from 'zod'

const createChiefComplaintZodSchema = z.object({
  body: z
    .object({
      nameEnglish: z.string().optional(),
      nameBangla: z.string().optional(),
    })
    .refine(data => data.nameEnglish || data.nameBangla, {
      message: 'Either nameEnglish or nameBangla must be provided',
    }),
})

const updateChiefComplaintZodSchema = z.object({
  body: z
    .object({
      nameEnglish: z.string().optional(),
      nameBangla: z.string().optional(),
    })
    .refine(data => data.nameEnglish || data.nameBangla, {
      message: 'Either nameEnglish or nameBangla must be provided',
    }),
})

export const ChiefComplaintValidation = {
  createChiefComplaintZodSchema,
  updateChiefComplaintZodSchema,
}
