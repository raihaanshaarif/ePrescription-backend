// specialAdvise.model.ts

import { Schema, model } from 'mongoose'
import { ISpecialAdvise, SpecialAdviseModel } from './specialAdvise.interface'

const specialAdviseSchema = new Schema<ISpecialAdvise>(
  {
    nameEnglish: { type: String },
    nameBangla: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const SpecialAdvise = model<ISpecialAdvise, SpecialAdviseModel>(
  'SpecialAdvise',
  specialAdviseSchema,
)
