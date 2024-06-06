/* eslint-disable @typescript-eslint/no-explicit-any */

import { IChiefComplaint } from './chiefComplaint.interface'

import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import ApiError from '../../../../errors/apiError'
import httpStatus from 'http-status'
import { ChiefComplaint } from './chiefComplaint.model'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IGenericResponse } from '../../../../interfaces/common'
import { chiefComplaintFields } from './chiefComplaint.constant'

const createChiefComplaint = async (
  data: IChiefComplaint,
): Promise<IChiefComplaint> => {
  const isDuplicate = await ChiefComplaint.findOne({
    $or: [{ nameEnglish: data.nameEnglish }],
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Chief complaint already exists')
  }

  const result = await ChiefComplaint.create(data)
  return result
}

const getAllChiefComplaints = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IChiefComplaint[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: chiefComplaintFields.map(field => ({
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

  const result = await ChiefComplaint.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await ChiefComplaint.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleChiefComplaint = async (
  id: string,
): Promise<IChiefComplaint | null> => {
  const result = await ChiefComplaint.findById(id)
  return result
}

const updateChiefComplaint = async (
  id: string,
  payload: Partial<IChiefComplaint>,
): Promise<IChiefComplaint | null> => {
  const result = await ChiefComplaint.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteChiefComplaint = async (
  id: string,
): Promise<IChiefComplaint | null> => {
  const result = await ChiefComplaint.findByIdAndDelete(id)
  return result
}

export const ChiefComplaintService = {
  createChiefComplaint,
  getAllChiefComplaints,
  getSingleChiefComplaint,
  updateChiefComplaint,
  deleteChiefComplaint,
}
