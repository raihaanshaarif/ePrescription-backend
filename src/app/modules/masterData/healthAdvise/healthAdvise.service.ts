/* eslint-disable @typescript-eslint/no-explicit-any */

import { IHealthAdvise } from './healthAdvise.interface'
import { healthAdviseFields } from './healthAdvise.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { HealthAdvise } from './healthAdvise.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'

const createHealthAdvise = async (
  data: IHealthAdvise,
): Promise<IHealthAdvise> => {
  const isDuplicate = await HealthAdvise.findOne({
    $or: [{ nameEnglish: data.nameEnglish }, { nameBangla: data.nameBangla }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Health advise already exists')
  }

  const result = await HealthAdvise.create(data)
  return result
}

const getAllHealthAdvises = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IHealthAdvise[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: healthAdviseFields.map(field => ({
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

  const result = await HealthAdvise.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await HealthAdvise.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleHealthAdvise = async (
  id: string,
): Promise<IHealthAdvise | null> => {
  const result = await HealthAdvise.findById(id)
  return result
}

const updateHealthAdvise = async (
  id: string,
  payload: Partial<IHealthAdvise>,
): Promise<IHealthAdvise | null> => {
  const result = await HealthAdvise.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteHealthAdvise = async (
  id: string,
): Promise<IHealthAdvise | null> => {
  const result = await HealthAdvise.findByIdAndDelete(id)
  return result
}

export const HealthAdviseService = {
  createHealthAdvise,
  getAllHealthAdvises,
  getSingleHealthAdvise,
  updateHealthAdvise,
  deleteHealthAdvise,
}
