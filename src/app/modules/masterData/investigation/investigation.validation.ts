// investigation.validation.ts

import { z } from 'zod'

const createInvestigationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
  }),
})

const updateInvestigationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const InvestigationValidation = {
  createInvestigationZodSchema,
  updateInvestigationZodSchema,
}
