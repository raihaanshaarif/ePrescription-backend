// prescription.validation.ts

import { z } from 'zod'
import { DURATION_UNIT_ENUM } from './prescription.constant'

const createPrescriptionZodSchema = z.object({
  body: z.object({
    patient: z.string({
      required_error: 'Patient ID is required!',
    }),
    clinicalInformation: z.object({
      heightFeet: z.number().optional(),
      heightInch: z.number().optional(),
      weightKg: z.number().optional(),
      weightLbs: z.number().optional(),
      temperatureF: z.number().optional(),
      temperatureC: z.number().optional(),
      pulse: z.number().optional(),
      respiration: z.number().optional(),
      bpSystolic: z.number().optional(),
      bpDiastolic: z.number().optional(),
      habit: z.string().optional(),
    }),
    onExamination: z.array(z.string()).optional(),
    chiefComplaints: z
      .array(
        z.object({
          complaint: z.string(),
          duration: z.string(),
          unit: z.enum(DURATION_UNIT_ENUM),
        }),
      )
      .optional(),
    history: z.array(z.string()).optional(),
    diagnosis: z.array(z.string()).optional(),
    investigation: z.array(z.string()).optional(),
    nextVisit: z.string().optional(),
    medication: z
      .array(
        z.object({
          medicine: z.string(),
          dose: z.string(),
          duration: z.string(),
          advise: z.string(),
        }),
      )
      .optional(),
    specialNote: z.string().optional(),
    advise: z.array(z.string()).optional(),
    reportEntries: z
      .array(
        z.object({
          date: z.string(),
          reportName: z.string(),
          resultValue: z.string(),
          unit: z.string(),
        }),
      )
      .optional(),
    referralDoctor: z.string().optional(),
    causeRemarks: z.string().optional(),
  }),
})

const updatePrescriptionZodSchema = z.object({
  body: z.object({
    patient: z.string().optional(),
    clinicalInformation: z
      .object({
        heightFeet: z.number().optional(),
        heightInch: z.number().optional(),
        weightKg: z.number().optional(),
        weightLbs: z.number().optional(),
        temperatureF: z.number().optional(),
        temperatureC: z.number().optional(),
        pulse: z.number().optional(),
        respiration: z.number().optional(),
        bpSystolic: z.number().optional(),
        bpDiastolic: z.number().optional(),
        habit: z.string().optional(),
      })
      .optional(),
    onExamination: z.array(z.string()).optional(),
    chiefComplaints: z
      .array(
        z.object({
          complaint: z.string().optional(),
          duration: z.string().optional(),
          unit: z.enum(DURATION_UNIT_ENUM).optional(),
        }),
      )
      .optional(),
    history: z.array(z.string()).optional(),
    diagnosis: z.array(z.string()).optional(),
    investigation: z.array(z.string()).optional(),
    nextVisit: z.string().optional(),
    medication: z
      .array(
        z.object({
          medicine: z.string().optional(),
          dose: z.string().optional(),
          duration: z.string().optional(),
          advise: z.string().optional(),
        }),
      )
      .optional(),
    specialNote: z.string().optional(),
    advise: z.array(z.string()).optional(),
    reportEntries: z
      .array(
        z.object({
          date: z.string().optional(),
          reportName: z.string().optional(),
          resultValue: z.string().optional(),
          unit: z.string().optional(),
        }),
      )
      .optional(),
    referralDoctor: z.string().optional(),
    causeRemarks: z.string().optional(),
  }),
})

export const PrescriptionValidation = {
  createPrescriptionZodSchema,
  updatePrescriptionZodSchema,
}
