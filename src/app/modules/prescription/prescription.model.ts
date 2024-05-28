// prescription.model.ts

import { Schema, model, Document } from 'mongoose'
import { IPrescription, PrescriptionModel } from './prescription.interface'

const prescriptionSchema = new Schema<IPrescription>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    clinicalInformation: {
      heightFeet: Number,
      heightInch: Number,
      weightKg: Number,
      weightLbs: Number,
      temperatureF: Number,
      temperatureC: Number,
      pulse: Number,
      respiration: Number,
      bpSystolic: Number,
      bpDiastolic: Number,
      habit: String,
    },
    onExamination: [{ type: Schema.Types.ObjectId, ref: 'OnExamination' }],
    chiefComplaints: [
      {
        complaint: { type: Schema.Types.ObjectId, ref: 'ChiefComplaint' },
        duration: { type: Schema.Types.ObjectId, ref: 'DoseDuration' },
        unit: String,
      },
    ],
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
    diagnosis: [{ type: Schema.Types.ObjectId, ref: 'Diagnosis' }],
    investigation: [{ type: Schema.Types.ObjectId, ref: 'Investigation' }],
    nextVisit: { type: Date },
    medication: [
      {
        medicine: { type: Schema.Types.ObjectId, ref: 'Medicine' },
        dose: { type: Schema.Types.ObjectId, ref: 'Doses' },
        duration: { type: Schema.Types.ObjectId, ref: 'DoseDuration' },
        advise: { type: Schema.Types.ObjectId, ref: 'MealAdministration' },
      },
    ],
    specialNote: String,
    advise: [{ type: Schema.Types.ObjectId, ref: 'SpecialAdvise' }],
    reportEntries: [
      {
        date: { type: Date },
        reportName: String,
        resultValue: String,
        unit: String,
      },
    ],
    referralDoctor: String,
    causeRemarks: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Prescription = model<IPrescription, PrescriptionModel>(
  'Prescription',
  prescriptionSchema,
)
