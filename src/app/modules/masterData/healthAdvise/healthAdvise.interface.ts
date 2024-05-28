// healthAdvise.interface.ts

import { Model, Types } from 'mongoose'

export type IHealthAdvise = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type HealthAdviseModel = Model<IHealthAdvise>
