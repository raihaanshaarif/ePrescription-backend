// investigation.interface.ts

import { Model, Types } from 'mongoose'

export type IInvestigation = {
  _id?: Types.ObjectId
  nameEnglish: string
}

export type InvestigationModel = Model<IInvestigation>
