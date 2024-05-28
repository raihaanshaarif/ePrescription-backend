// doses.model.ts

import { Schema, model } from 'mongoose'
import { IDoses, DosesModel } from './doses.interface'

const dosesSchema = new Schema<IDoses>(
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

export const Doses = model<IDoses, DosesModel>('Doses', dosesSchema)
