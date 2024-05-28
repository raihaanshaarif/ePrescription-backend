// diagnosis.interface.ts

import { Model, Types } from 'mongoose'

export type IDiagnosis = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type DiagnosisModel = Model<IDiagnosis>
