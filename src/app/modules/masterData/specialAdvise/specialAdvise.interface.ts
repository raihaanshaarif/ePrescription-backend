// specialAdvise.interface.ts

import { Model, Types } from 'mongoose'

export type ISpecialAdvise = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type SpecialAdviseModel = Model<ISpecialAdvise>
