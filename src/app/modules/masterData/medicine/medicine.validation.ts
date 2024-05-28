// medicine.validation.ts

import { z } from 'zod'

const createMedicineZodSchema = z.object({
  body: z.object({
    companyName: z.string({
      required_error: 'Company name is required!',
    }),
    medicineName: z.string({
      required_error: 'Medicine name is required!',
    }),
    type: z.string({
      required_error: 'Type is required!',
    }),
    generic: z.string({
      required_error: 'Generic is required!',
    }),
  }),
})

const updateMedicineZodSchema = z.object({
  body: z.object({
    companyName: z.string().optional(),
    medicineName: z.string().optional(),
    type: z.string().optional(),
    generic: z.string().optional(),
  }),
})

export const MedicineValidation = {
  createMedicineZodSchema,
  updateMedicineZodSchema,
}
