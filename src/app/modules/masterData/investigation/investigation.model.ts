// investigation.model.ts

import { Schema, model } from 'mongoose'
import { IInvestigation, InvestigationModel } from './investigation.interface'

const investigationSchema = new Schema<IInvestigation>(
  {
    nameEnglish: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Investigation = model<IInvestigation, InvestigationModel>(
  'Investigation',
  investigationSchema,
)
