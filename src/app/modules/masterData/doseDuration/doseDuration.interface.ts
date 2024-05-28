// doseDuration.interface.ts

import { Model, Types } from 'mongoose'

export type IDoseDuration = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type DoseDurationModel = Model<IDoseDuration>
