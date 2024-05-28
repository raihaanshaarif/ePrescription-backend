// onExamination.validation.ts

import { z } from 'zod'

const createOnExaminationZodSchema = z.object({
  body: z
    .object({
      examsEnglish: z.string().optional(),
      examsBangla: z.string().optional(),
    })
    .refine(data => data.examsEnglish || data.examsBangla, {
      message: 'Either examsEnglish or examsBangla must be provided',
    }),
})

const updateOnExaminationZodSchema = z.object({
  body: z
    .object({
      examsEnglish: z.string().optional(),
      examsBangla: z.string().optional(),
    })
    .refine(data => data.examsEnglish || data.examsBangla, {
      message: 'Either examsEnglish or examsBangla must be provided',
    }),
})

export const OnExaminationValidation = {
  createOnExaminationZodSchema,
  updateOnExaminationZodSchema,
}
