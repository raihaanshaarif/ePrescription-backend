/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDoseDuration } from './doseDuration.interface'
import { doseDurationFields } from './doseDuration.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { DoseDuration } from './doseDuration.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'

const createDoseDuration = async (
  data: IDoseDuration,
): Promise<IDoseDuration> => {
  const isDuplicate = await DoseDuration.findOne({
    $or: [{ nameEnglish: data.nameEnglish }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Dose duration already exists')
  }

  const result = await DoseDuration.create(data)
  return result
}

const getAllDoseDurations = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDoseDuration[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: doseDurationFields.map(field => ({
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

  const result = await DoseDuration.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await DoseDuration.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDoseDuration = async (
  id: string,
): Promise<IDoseDuration | null> => {
  const result = await DoseDuration.findById(id)
  return result
}

const updateDoseDuration = async (
  id: string,
  payload: Partial<IDoseDuration>,
): Promise<IDoseDuration | null> => {
  const result = await DoseDuration.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteDoseDuration = async (
  id: string,
): Promise<IDoseDuration | null> => {
  const result = await DoseDuration.findByIdAndDelete(id)
  return result
}

export const DoseDurationService = {
  createDoseDuration,
  getAllDoseDurations,
  getSingleDoseDuration,
  updateDoseDuration,
  deleteDoseDuration,
}
