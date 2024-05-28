// medicine.interface.ts

import { Model, Types } from 'mongoose'

export type IMedicine = {
  _id?: Types.ObjectId
  companyName: string
  medicineName: string
  type: string
  generic: string
}

export type MedicineModel = Model<IMedicine>
