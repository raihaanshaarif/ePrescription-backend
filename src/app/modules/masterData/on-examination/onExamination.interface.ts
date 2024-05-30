// onExamination.interface.ts

import { Model, Types } from 'mongoose'

export type IOnExamination = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type OnExaminationModel = Model<IOnExamination>
