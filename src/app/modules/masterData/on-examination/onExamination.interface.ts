// onExamination.interface.ts

import { Model, Types } from 'mongoose'

export type IOnExamination = {
  _id?: Types.ObjectId
  examsEnglish?: string
  examsBangla?: string
}

export type OnExaminationModel = Model<IOnExamination>
