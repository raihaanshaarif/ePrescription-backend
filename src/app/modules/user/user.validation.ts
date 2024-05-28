import { z } from 'zod'

// Helper function to convert dd/mm/yyyy to Date object
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required!',
    }),
    name: z.string({
      required_error: 'Name is required!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email('Invalid email address'),
    role: z.string().optional(),
    address: z.string({
      required_error: 'Address is required!',
    }),
    phone: z.string({
      required_error: 'Phone is required!',
    }),
    designation: z.string().optional(),
    startDate: z
      .string({
        required_error: 'Start date is required!',
      })
      .refine(date => date !== undefined && date.trim() !== '', {
        message: 'Start date must not be empty',
      })
      .refine(
        date => {
          const parsedDate = parseDate(date)
          return !isNaN(parsedDate.getTime())
        },
        {
          message: 'Start date must be a valid date in dd/mm/yyyy format',
        },
      )
      .transform(date => parseDate(date)),
    expiryDate: z
      .string({
        required_error: 'Expiry date is required!',
      })
      .refine(date => date !== undefined && date.trim() !== '', {
        message: 'Expiry date must not be empty',
      })
      .refine(
        date => {
          const parsedDate = parseDate(date)
          return !isNaN(parsedDate.getTime())
        },
        {
          message: 'Expiry date must be a valid date in dd/mm/yyyy format',
        },
      )
      .transform(date => parseDate(date)),
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    designation: z.string().optional(),
    startDate: z
      .string()
      .optional()
      .refine(
        date =>
          date === undefined ||
          (date.trim() !== '' && !isNaN(parseDate(date).getTime())),
        {
          message: 'Start date must be a valid date in dd/mm/yyyy format',
        },
      )
      .transform(date => (date !== undefined ? parseDate(date) : undefined)),
    expiryDate: z
      .string()
      .optional()
      .refine(
        date =>
          date === undefined ||
          (date.trim() !== '' && !isNaN(parseDate(date).getTime())),
        {
          message: 'Expiry date must be a valid date in dd/mm/yyyy format',
        },
      )
      .transform(date => (date !== undefined ? parseDate(date) : undefined)),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
