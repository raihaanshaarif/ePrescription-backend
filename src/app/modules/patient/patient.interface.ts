import { Model, Types } from 'mongoose'

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum Religion {
  Islam = 'Islam',
  Hinduism = 'Hinduism',
  Buddhism = 'Buddhism',
  Christianity = 'Christianity',
  Other = 'Other',
}

export enum Occupation {
  Job = 'Job',
  Business = 'Business',
  Service = 'Service',
  Student = 'Student',
  Housewife = 'Housewife',
  Unemployed = 'Unemployed',
  Other = 'Other',
}

export interface IPatient {
  _id?: Types.ObjectId
  fullName: string
  ageYear: number
  ageMonth?: number
  ageDay?: number
  gender?: Gender
  bloodGroup?: string
  mobileNo?: string
  email?: string
  address?: string
  guardianName?: string
  guardianPhone?: string
  religion?: Religion
  occupation?: Occupation
  prescriptions?: Types.ObjectId[] // Array of prescription IDs
}

export type IPatientFilters = {
  searchTerm?: string
  mobileNo?: string
}

export type PatientModel = {
  isPatientExist(
    mobileNo: string,
  ): Promise<Pick<IPatient, '_id' | 'fullName' | 'email' | 'prescriptions'>>
} & Model<IPatient>
