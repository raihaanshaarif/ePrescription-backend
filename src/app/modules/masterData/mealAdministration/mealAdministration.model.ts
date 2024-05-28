// mealAdministration.model.ts

import { Schema, model } from 'mongoose'
import {
  IMealAdministration,
  MealAdministrationModel,
} from './mealAdministration.interface'

const mealAdministrationSchema = new Schema<IMealAdministration>(
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

export const MealAdministration = model<
  IMealAdministration,
  MealAdministrationModel
>('MealAdministration', mealAdministrationSchema)
