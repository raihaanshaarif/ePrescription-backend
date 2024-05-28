// doses.interface.ts

import { Model, Types } from 'mongoose'

export type IDoses = {
  _id?: Types.ObjectId
  nameEnglish?: string
  nameBangla?: string
}

export type DosesModel = Model<IDoses>
