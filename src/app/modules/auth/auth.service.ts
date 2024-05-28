import httpStatus from 'http-status'
import { IUser } from '../user/user.interface'
import { IRefreshTokenResponse } from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/apiError'
import { User } from '../user/user.model'

// Helper function to parse dd/mm/yyyy date strings
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

const userLogin = async (payload: Pick<IUser, 'email' | 'password'>) => {
  const { email: userEmail, password } = payload

  // user exists:
  const user = await User.isUserExist(userEmail)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // password matching:
  if (
    !user.password ||
    !(await User.isPasswordMatched(password, user.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // check if user expiryDate is passed
  if (user.expiryDate && parseDate(user.expiryDate) < new Date()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User account has expired')
  }

  // create access token & refresh token
  const { _id, role, email } = user
  const accessToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string,
  )

  return {
    accessToken,
    refreshToken,
    user,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify refresh token
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refreshSecret as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { _id } = verifiedToken

  // if user exist in database
  const user = await User.findById(_id).lean()

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // check if user expiryDate is passed
  if (user.expiryDate && parseDate(user.expiryDate) < new Date()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User account has expired')
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: user._id,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )

  return {
    user,
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  userLogin,
  refreshToken,
}
