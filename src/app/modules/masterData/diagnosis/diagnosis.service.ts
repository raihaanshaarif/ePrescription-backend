/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDiagnosis } from './diagnosis.interface'
import { diagnosisFields } from './diagnosis.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { Diagnosis } from './diagnosis.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'

const createDiagnosis = async (data: IDiagnosis): Promise<IDiagnosis> => {
  const isDuplicate = await Diagnosis.findOne({
    $or: [{ nameEnglish: data.nameEnglish }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Diagnosis already exists')
  }

  const result = await Diagnosis.create(data)
  return result
}

const getAllDiagnoses = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDiagnosis[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: diagnosisFields.map(field => ({
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

  const result = await Diagnosis.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Diagnosis.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDiagnosis = async (id: string): Promise<IDiagnosis | null> => {
  const result = await Diagnosis.findById(id)
  return result
}

const updateDiagnosis = async (
  id: string,
  payload: Partial<IDiagnosis>,
): Promise<IDiagnosis | null> => {
  const result = await Diagnosis.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteDiagnosis = async (id: string): Promise<IDiagnosis | null> => {
  const result = await Diagnosis.findByIdAndDelete(id)
  return result
}

export const DiagnosisService = {
  createDiagnosis,
  getAllDiagnoses,
  getSingleDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
}
