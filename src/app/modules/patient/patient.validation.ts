import { z } from 'zod'
import { Types } from 'mongoose'

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum Religion {
  Islam = 'Islam',
  Hinduism = 'Hinduism',
  Buddhism = 'Buddhism',
  Christianity = 'Christianity',
  Other = 'Other',
}

export enum Occupation {
  Job = 'Job',
  Business = 'Business',
  Service = 'Service',
  Student = 'Student',
  Housewife = 'Housewife',
  Unemployed = 'Unemployed',
  Other = 'Other',
}

// Helper function to convert dd/mm/yyyy to Date object
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Zod schema for IPatient
const createPatientZodSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required!',
    }),
    ageYear: z.string().optional(),
    ageMonth: z.string().optional(),
    ageDay: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    bloodGroup: z.string().optional(),
    mobileNo: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    address: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    religion: z.nativeEnum(Religion).optional(),
    occupation: z.nativeEnum(Occupation).optional(),
    maritalStatus: z.string().optional(),
    prescriptions: z
      .array(
        z.string().refine(val => Types.ObjectId.isValid(val), {
          message: 'Invalid prescription ID',
        }),
      )
      .optional(),
  }),
})

const updatePatientZodSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    ageYear: z.string().optional(),
    ageMonth: z.string().optional(),
    ageDay: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    bloodGroup: z.string().optional(),
    mobileNo: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    address: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    religion: z.nativeEnum(Religion).optional(),
    occupation: z.nativeEnum(Occupation).optional(),
    maritalStatus: z.string().optional(),
    prescriptions: z
      .array(
        z.string().refine(val => Types.ObjectId.isValid(val), {
          message: 'Invalid prescription ID',
        }),
      )
      .optional(),
  }),
})

export const PatientValidation = {
  createPatientZodSchema,
  updatePatientZodSchema,
}
