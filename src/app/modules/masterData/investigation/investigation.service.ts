/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiError from '../../../../errors/apiError'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../../interfaces/common'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IInvestigation } from './investigation.interface'
import { Investigation } from './investigation.model'

import httpStatus from 'http-status'

import { SortOrder } from 'mongoose'

const createInvestigation = async (
  data: IInvestigation,
): Promise<IInvestigation> => {
  const isDuplicate = await Investigation.findOne({
    nameEnglish: data.nameEnglish,
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Investigation already exists')
  }

  const result = await Investigation.create(data)
  return result
}

const getAllInvestigations = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IInvestigation[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: [{ nameEnglish: { $regex: searchTerm, $options: 'i' } }],
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

  const result = await Investigation.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Investigation.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleInvestigation = async (
  id: string,
): Promise<IInvestigation | null> => {
  const result = await Investigation.findById(id)
  return result
}

const updateInvestigation = async (
  id: string,
  payload: Partial<IInvestigation>,
): Promise<IInvestigation | null> => {
  const result = await Investigation.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteInvestigation = async (
  id: string,
): Promise<IInvestigation | null> => {
  const result = await Investigation.findByIdAndDelete(id)
  return result
}

export const InvestigationService = {
  createInvestigation,
  getAllInvestigations,
  getSingleInvestigation,
  updateInvestigation,
  deleteInvestigation,
}
