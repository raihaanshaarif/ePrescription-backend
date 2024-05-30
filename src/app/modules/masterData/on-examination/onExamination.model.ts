// onExamination.model.ts

import { Schema, model } from 'mongoose'
import { IOnExamination, OnExaminationModel } from './onExamination.interface'

const onExaminationSchema = new Schema<IOnExamination>(
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

export const OnExamination = model<IOnExamination, OnExaminationModel>(
  'OnExamination',
  onExaminationSchema,
)
