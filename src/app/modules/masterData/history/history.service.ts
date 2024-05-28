/* eslint-disable @typescript-eslint/no-explicit-any */

import { IHistory } from './history.interface'
import { historyFields } from './history.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { History } from './history.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'

const createHistory = async (data: IHistory): Promise<IHistory> => {
  const isDuplicate = await History.findOne({
    $or: [{ nameEnglish: data.nameEnglish }, { nameBangla: data.nameBangla }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'History entry already exists')
  }

  const result = await History.create(data)
  return result
}

const getAllHistories = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IHistory[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: historyFields.map(field => ({
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

  const result = await History.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await History.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleHistory = async (id: string): Promise<IHistory | null> => {
  const result = await History.findById(id)
  return result
}

const updateHistory = async (
  id: string,
  payload: Partial<IHistory>,
): Promise<IHistory | null> => {
  const result = await History.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteHistory = async (id: string): Promise<IHistory | null> => {
  const result = await History.findByIdAndDelete(id)
  return result
}

export const HistoryService = {
  createHistory,
  getAllHistories,
  getSingleHistory,
  updateHistory,
  deleteHistory,
}
