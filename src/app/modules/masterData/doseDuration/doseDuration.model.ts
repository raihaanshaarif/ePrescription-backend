// doseDuration.model.ts

import { Schema, model } from 'mongoose'
import { IDoseDuration, DoseDurationModel } from './doseDuration.interface'

const doseDurationSchema = new Schema<IDoseDuration>(
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

export const DoseDuration = model<IDoseDuration, DoseDurationModel>(
  'DoseDuration',
  doseDurationSchema,
)
