/* eslint-disable @typescript-eslint/no-explicit-any */

import { ISpecialAdvise } from './specialAdvise.interface'
import { specialAdviseFields } from './specialAdvise.constant'
import { SortOrder } from 'mongoose'

import httpStatus from 'http-status'
import { SpecialAdvise } from './specialAdvise.model'
import ApiError from '../../../../errors/apiError'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'

const createSpecialAdvise = async (
  data: ISpecialAdvise,
): Promise<ISpecialAdvise> => {
  const isDuplicate = await SpecialAdvise.findOne({
    $or: [{ nameEnglish: data.nameEnglish }, { nameBangla: data.nameBangla }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Special advise already exists')
  }

  const result = await SpecialAdvise.create(data)
  return result
}

const getAllSpecialAdvises = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISpecialAdvise[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: specialAdviseFields.map(field => ({
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

  const result = await SpecialAdvise.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await SpecialAdvise.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleSpecialAdvise = async (
  id: string,
): Promise<ISpecialAdvise | null> => {
  const result = await SpecialAdvise.findById(id)
  return result
}

const updateSpecialAdvise = async (
  id: string,
  payload: Partial<ISpecialAdvise>,
): Promise<ISpecialAdvise | null> => {
  const result = await SpecialAdvise.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteSpecialAdvise = async (
  id: string,
): Promise<ISpecialAdvise | null> => {
  const result = await SpecialAdvise.findByIdAndDelete(id)
  return result
}

export const SpecialAdviseService = {
  createSpecialAdvise,
  getAllSpecialAdvises,
  getSingleSpecialAdvise,
  updateSpecialAdvise,
  deleteSpecialAdvise,
}
