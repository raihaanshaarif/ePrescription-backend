/* eslint-disable @typescript-eslint/no-explicit-any */

import { SortOrder } from 'mongoose'
import ApiError from '../../../../errors/apiError'
import { paginationHelpers } from '../../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../../interfaces/common'
import { IPaginationOptions } from '../../../../interfaces/pagination'
import { IMedicine } from './medicine.interface'
import { Medicine } from './medicine.model'

import httpStatus from 'http-status'

const createMedicine = async (data: IMedicine): Promise<IMedicine> => {
  const isDuplicate = await Medicine.findOne({
    medicineName: data.medicineName,
  })

  if (isDuplicate) {
    throw new ApiError(httpStatus.IM_USED, 'Medicine already exists')
  }

  const result = await Medicine.create(data)
  return result
}

const getAllMedicines = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IMedicine[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: [
        { companyName: { $regex: searchTerm, $options: 'i' } },
        { medicineName: { $regex: searchTerm, $options: 'i' } },
        { type: { $regex: searchTerm, $options: 'i' } },
        { generic: { $regex: searchTerm, $options: 'i' } },
      ],
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

  const result = await Medicine.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Medicine.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleMedicine = async (id: string): Promise<IMedicine | null> => {
  const result = await Medicine.findById(id)
  return result
}

const updateMedicine = async (
  id: string,
  payload: Partial<IMedicine>,
): Promise<IMedicine | null> => {
  const result = await Medicine.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteMedicine = async (id: string): Promise<IMedicine | null> => {
  const result = await Medicine.findByIdAndDelete(id)
  return result
}

export const MedicineService = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
}
