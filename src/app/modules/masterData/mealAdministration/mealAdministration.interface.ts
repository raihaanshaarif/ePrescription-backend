// mealAdministration.interface.ts

import { Model, Types } from 'mongoose'

export type IMealAdministration = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type MealAdministrationModel = Model<IMealAdministration>
