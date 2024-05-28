// prescription.interface.ts

import { Model, Types } from 'mongoose'

export type IPrescription = {
  _id?: Types.ObjectId
  patient: Types.ObjectId // Linked to patient module
  clinicalInformation: {
    heightFeet: number
    heightInch: number
    weightKg: number
    weightLbs: number
    temperatureF: number
    temperatureC: number
    pulse: number
    respiration: number
    bpSystolic: number
    bpDiastolic: number
    habit: string
  }
  onExamination: Types.ObjectId[] // Linked to onExamination module
  chiefComplaints: {
    complaint: Types.ObjectId // Linked to chiefComplaint module
    duration: Types.ObjectId // Linked to doseDuration module
    unit: 'day' | 'month' | 'week' | 'hour' | 'minute'
  }[]
  history: Types.ObjectId[] // Linked to history module
  diagnosis: Types.ObjectId[] // Linked to diagnosis module
  investigation: Types.ObjectId[] // Linked to investigation module
  nextVisit: Date
  medication: {
    medicine: Types.ObjectId // Linked to medicine module
    dose: Types.ObjectId // Linked to doses module
    duration: Types.ObjectId // Linked to doseDuration module
    advise: Types.ObjectId // Linked to mealAdministration module
  }[]
  specialNote: string
  advise: Types.ObjectId[] // Linked to healthAdvise module
  reportEntries: {
    date: Date
    reportName: string
    resultValue: string
    unit: string
  }[]
  referralDoctor: string
  causeRemarks: string
}

export type PrescriptionModel = Model<IPrescription>
