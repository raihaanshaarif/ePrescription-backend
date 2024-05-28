/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

type IUserRole = 'user' | 'admin'

export type IUser = {
  _id?: Types.ObjectId
  name?: string
  email: string
  password: string
  role: IUserRole
  address: string
  phone: string
  designation?: string
  startDate: string // Ensure the startDate is a string to match your format
  expiryDate: string // Ensure the expiryDate is a string to match your format
}

export type IUserWithoutPassword = Omit<IUser, 'password'>

export type IUserFilters = {
  searchTerm?: string
}

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<
    Pick<IUser, '_id' | 'password' | 'role' | 'email' | 'name' | 'expiryDate'>
  >
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>
