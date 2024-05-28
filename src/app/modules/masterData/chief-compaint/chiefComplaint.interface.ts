// chiefComplaint.interface.ts

import { Model, Types } from 'mongoose'

export type IChiefComplaint = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type ChiefComplaintModel = Model<IChiefComplaint>
