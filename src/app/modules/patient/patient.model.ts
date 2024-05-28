import { Schema, model } from 'mongoose'
import {
  IPatient,
  PatientModel,
  Gender,
  Religion,
  Occupation,
} from './patient.interface'

// Define the Patient schema
const patientSchema = new Schema<IPatient, PatientModel>(
  {
    fullName: { type: String, required: true },
    ageYear: { type: Number, required: true },
    ageMonth: { type: Number, required: false },
    ageDay: { type: Number, required: false },
    gender: { type: String, enum: Object.values(Gender), required: false },
    bloodGroup: { type: String, required: false },
    mobileNo: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    address: { type: String, required: false },
    guardianName: { type: String, required: false },
    guardianPhone: { type: String, required: false },
    religion: { type: String, enum: Object.values(Religion), required: false },
    occupation: {
      type: String,
      enum: Object.values(Occupation),
      required: false,
    },
    prescriptions: [
      { type: Schema.Types.ObjectId, ref: 'Prescription', required: false },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        return ret
      },
    },
  },
)

// Static method to check if patient exists by mobile number
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
// Export the Patient model
export const Patient = model<IPatient, PatientModel>('Patient', patientSchema)
