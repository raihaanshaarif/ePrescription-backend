// medicine.model.ts

import { Schema, model } from 'mongoose'
import { IMedicine, MedicineModel } from './medicine.interface'

const medicineSchema = new Schema<IMedicine>(
  {
    companyName: { type: String, required: true },
    medicineName: { type: String, required: true },
    type: { type: String, required: true },
    generic: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Medicine = model<IMedicine, MedicineModel>(
  'Medicine',
  medicineSchema,
)
