// File path: validators/appointment.validator.ts

import { z } from 'zod'
import { Types } from 'mongoose'
import { AppointmentStatus, AppointmentType } from './appointment.interface'

// Helper function to convert dd/mm/yyyy to Date object
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Zod schema for creating an appointment
const createAppointmentZodSchema = z.object({
  body: z.object({
    serialId: z.string().optional(),
    appointmentNumber: z.string().optional(),
    patientId: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid patient ID',
    }),
    doctorId: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid doctor ID',
    }),
    branchId: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid branch ID',
    }),
    date: z.string().refine(val => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
      message: 'Date must be in dd/mm/yyyy format',
    }),
    time: z.string().refine(val => /^\d{2}:\d{2}$/.test(val), {
      message: 'Time must be in HH:mm format',
    }),
    status: z.nativeEnum(AppointmentStatus),
    appointmentType: z.nativeEnum(AppointmentType),
  }),
})

// Zod schema for updating an appointment
const updateAppointmentZodSchema = z.object({
  body: z.object({
    serialId: z.string().optional(),
    appointmentNumber: z.string().optional(),
    patientId: z
      .string()
      .refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid patient ID',
      })
      .optional(),
    doctorId: z
      .string()
      .refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid doctor ID',
      })
      .optional(),
    branchId: z
      .string()
      .refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid branch ID',
      })
      .optional(),
    date: z
      .string()
      .refine(val => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
        message: 'Date must be in dd/mm/yyyy format',
      })
      .optional(),
    time: z
      .string()
      .refine(val => !val || /^\d{2}:\d{2}$/.test(val), {
        message: 'Time must be in HH:mm format',
      })
      .optional(),
    status: z.nativeEnum(AppointmentStatus).optional(),
    appointmentType: z.nativeEnum(AppointmentType).optional(),
  }),
})

export const AppointmentValidation = {
  createAppointmentZodSchema,
  updateAppointmentZodSchema,
}
