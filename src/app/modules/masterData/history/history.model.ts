// history.model.ts

import { Schema, model } from 'mongoose'
import { IHistory, HistoryModel } from './history.interface'

const historySchema = new Schema<IHistory>(
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

export const History = model<IHistory, HistoryModel>('History', historySchema)
