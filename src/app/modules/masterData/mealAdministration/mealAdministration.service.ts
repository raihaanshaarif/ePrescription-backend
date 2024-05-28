/* eslint-disable @typescript-eslint/no-explicit-any */

import { IMealAdministration } from './mealAdministration.interface'
import { mealAdministrationFields } from './mealAdministration.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { MealAdministration } from './mealAdministration.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'

const createMealAdministration = async (
  data: IMealAdministration,
): Promise<IMealAdministration> => {
  const isDuplicate = await MealAdministration.findOne({
    $or: [{ nameEnglish: data.nameEnglish }, { nameBangla: data.nameBangla }],
  })

  if (isDuplicate) {
    throw new ApiError(
      httpStatus.IM_USED,
      'Meal administration entry already exists',
    )
  }

  const result = await MealAdministration.create(data)
  return result
}

const getAllMealAdministrations = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IMealAdministration[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: mealAdministrationFields.map(field => ({
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

  const result = await MealAdministration.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await MealAdministration.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleMealAdministration = async (
  id: string,
): Promise<IMealAdministration | null> => {
  const result = await MealAdministration.findById(id)
  return result
}

const updateMealAdministration = async (
  id: string,
  payload: Partial<IMealAdministration>,
): Promise<IMealAdministration | null> => {
  const result = await MealAdministration.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteMealAdministration = async (
  id: string,
): Promise<IMealAdministration | null> => {
  const result = await MealAdministration.findByIdAndDelete(id)
  return result
}

export const MealAdministrationService = {
  createMealAdministration,
  getAllMealAdministrations,
  getSingleMealAdministration,
  updateMealAdministration,
  deleteMealAdministration,
}
