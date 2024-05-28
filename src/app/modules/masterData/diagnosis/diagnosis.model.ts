// diagnosis.model.ts

import { Schema, model } from 'mongoose'
import { IDiagnosis, DiagnosisModel } from './diagnosis.interface'

const diagnosisSchema = new Schema<IDiagnosis>(
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

export const Diagnosis = model<IDiagnosis, DiagnosisModel>(
  'Diagnosis',
  diagnosisSchema,
)
