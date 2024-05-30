/* eslint-disable @typescript-eslint/no-explicit-any */

import { IOnExamination } from './onExamination.interface'
import { onExaminationFields } from './onExamination.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'

import httpStatus from 'http-status'
import { OnExamination } from './onExamination.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'
import ApiError from '../../../../errors/apiError'

const createOnExamination = async (
  data: IOnExamination,
): Promise<IOnExamination> => {
  const isDuplicate = await OnExamination.findOne({
    $or: [{ nameEnglish: data.nameEnglish }, { nameBangla: data.nameBangla }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Examination already exists')
  }

  const result = await OnExamination.create(data)
  return result
}

const getAllOnExaminations = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IOnExamination[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: onExaminationFields.map(field => ({
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

  const result = await OnExamination.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await OnExamination.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleOnExamination = async (
  id: string,
): Promise<IOnExamination | null> => {
  const result = await OnExamination.findById(id)
  return result
}

const updateOnExamination = async (
  id: string,
  payload: Partial<IOnExamination>,
): Promise<IOnExamination | null> => {
  const result = await OnExamination.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteOnExamination = async (
  id: string,
): Promise<IOnExamination | null> => {
  const result = await OnExamination.findByIdAndDelete(id)
  return result
}

export const OnExaminationService = {
  createOnExamination,
  getAllOnExaminations,
  getSingleOnExamination,
  updateOnExamination,
  deleteOnExamination,
}
