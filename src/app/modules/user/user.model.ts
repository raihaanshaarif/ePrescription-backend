import { Schema, UpdateQuery, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { userRoles } from './user.constant'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: userRoles },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    designation: { type: String },
    startDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        return ret
      },
    },
  },
)

userSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<
  IUser,
  '_id' | 'password' | 'role' | 'email' | 'name' | 'expiryDate'
> | null> {
  return await this.findOne(
    { email },
    { password: 1, role: 1, email: 1, name: 1, expiryDate: 1 },
  ).lean()
}

// password verification
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

// user password hashing on saving document
userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// user password hashing if password sent by client
userSchema.pre('findOneAndUpdate', async function (next) {
  const user = this.getUpdate() as UpdateQuery<Partial<IUser>>
  if (!user.password) {
    next() // no password, so no update.
  } else {
    const newPassword = user.password
    user.password = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds),
    )
    next()
  }
})

export const User = model<IUser, UserModel>('User', userSchema)
