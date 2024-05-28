/* eslint-disable @typescript-eslint/no-explicit-any */

import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import ApiError from '../../../errors/apiError'
import httpStatus from 'http-status'

import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { IPatient, IPatientFilters } from './patient.interface'
import { Patient } from './patient.model'
import { patientSearchableFields } from './patient.constant'

const createPatient = async (data: IPatient): Promise<IPatient> => {
  if (!data.mobileNo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mobile number is required')
  }

  const isPatientExist = await Patient.isPatientExist(data.mobileNo)
  if (isPatientExist) {
    throw new ApiError(httpStatus.IM_USED, 'Phone Already Exists')
  }

  const result = await Patient.create(data)
  return result
}
const getAllPatients = async (
  filters: IPatientFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IPatient[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: patientSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Patient.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Patient.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSinglePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findById(id)
  return result
}

const updatePatient = async (
  id: string,
  payload: Partial<IPatient>,
): Promise<IPatient | null> => {
  const isExist = await Patient.findOne({ _id: id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found')
  }
  console.log(id, payload)
  const { ...userData } = payload
  const updatedUserData = { ...userData }

  // dynamically handling

  const result = await Patient.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  })

  return result
}
const deletePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findByIdAndDelete(id)
  return result
}

export const PatientService = {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
}
