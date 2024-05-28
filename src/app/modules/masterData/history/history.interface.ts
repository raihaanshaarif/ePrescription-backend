// history.interface.ts

import { Model, Types } from 'mongoose'

export type IHistory = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type HistoryModel = Model<IHistory>
