// chiefComplaint.model.ts

import { Schema, model } from 'mongoose'
import {
  ChiefComplaintModel,
  IChiefComplaint,
} from './chiefComplaint.interface'

const chiefComplaintSchema = new Schema<IChiefComplaint>(
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

export const ChiefComplaint = model<IChiefComplaint, ChiefComplaintModel>(
  'ChiefComplaint',
  chiefComplaintSchema,
)
