// healthAdvise.model.ts

import { Schema, model } from 'mongoose'
import { IHealthAdvise, HealthAdviseModel } from './healthAdvise.interface'

const healthAdviseSchema = new Schema<IHealthAdvise>(
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

export const HealthAdvise = model<IHealthAdvise, HealthAdviseModel>(
  'HealthAdvise',
  healthAdviseSchema,
)
