// patient.model.ts

import { Schema, model, Document } from 'mongoose'
import { IPatient, PatientModel } from './patient.interface'

const generatePatientID = (): string => {
  return Math.floor(1000000 + Math.random() * 9000000).toString()
}

const patientSchema = new Schema<IPatient>(
  {
    patientID: {
      type: String,
      required: true,
      unique: true,
      default: generatePatientID,
    },
    fullName: { type: String, required: true },
    ageYear: { type: Number, required: true },
    ageMonth: { type: Number },
    ageDay: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    bloodGroup: { type: String },
    mobileNo: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
    guardianName: { type: String },
    guardianPhone: { type: String },
    religion: {
      type: String,
      enum: ['Islam', 'Hinduism', 'Buddhism', 'Christianity', 'Other'],
    },
    occupation: {
      type: String,
      enum: [
        'Job',
        'Business',
        'Service',
        'Student',
        'Housewife',
        'Unemployed',
        'Other',
      ],
    },
    prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// Ensure unique patientID before saving the document
patientSchema.pre('save', async function (next) {
  const patient = this as IPatient & Document

  if (!patient.patientID) {
    let isUnique = false
    while (!isUnique) {
      const newPatientID = generatePatientID()
      const existingPatient = await Patient.findOne({ patientID: newPatientID })

      if (!existingPatient) {
        patient.patientID = newPatientID
        isUnique = true
      }
    }
  }
  next()
})

patientSchema.statics.isPatientExist = async function (
  mobileNo: string,
): Promise<Pick<
  IPatient,
  '_id' | 'fullName' | 'email' | 'prescriptions'
> | null> {
  return await this.findOne(
    { mobileNo },
    { _id: 1, fullName: 1, email: 1, prescriptions: 1 },
  ).lean()
}

export const Patient = model<IPatient, PatientModel>('Patient', patientSchema)
