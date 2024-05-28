/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDoses } from './doses.interface'
import { dosesFields } from './doses.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { Doses } from './doses.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'

const createDoses = async (data: IDoses): Promise<IDoses> => {
  const isDuplicate = await Doses.findOne({
    $or: [{ nameEnglish: data.nameEnglish }, { nameBangla: data.nameBangla }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Dose already exists')
  }

  const result = await Doses.create(data)
  return result
}

const getAllDoses = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDoses[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: dosesFields.map(field => ({
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

  const result = await Doses.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Doses.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDoses = async (id: string): Promise<IDoses | null> => {
  const result = await Doses.findById(id)
  return result
}

const updateDoses = async (
  id: string,
  payload: Partial<IDoses>,
): Promise<IDoses | null> => {
  const result = await Doses.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteDoses = async (id: string): Promise<IDoses | null> => {
  const result = await Doses.findByIdAndDelete(id)
  return result
}

export const DosesService = {
  createDoses,
  getAllDoses,
  getSingleDoses,
  updateDoses,
  deleteDoses,
}
