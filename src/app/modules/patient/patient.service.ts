// patient.service.ts

import { IPatient } from './patient.interface'
import { Patient } from './patient.model'
import ApiError from '../../../errors/apiError'
import httpStatus from 'http-status'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'

const createPatient = async (data: IPatient): Promise<IPatient> => {
  // Ensure unique patientID if not provided
  if (!data.patientID) {
    let isUnique = false
    while (!isUnique) {
      const patientID = Math.floor(1000000 + Math.random() * 9000000).toString()
      const existingPatient = await Patient.findOne({ patientID })
      if (!existingPatient) {
        data.patientID = patientID
        isUnique = true
      }
    }
  }

  const result = await Patient.create(data)
  return result
}

const getAllPatients = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IPatient[]>> => {
  const { searchTerm, patientID, mobileNo, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: [
        { patientID: { $regex: searchTerm, $options: 'i' } },
        { mobileNo: { $regex: searchTerm, $options: 'i' } },
        { fullName: { $regex: searchTerm, $options: 'i' } },
        // Add other fields you want to search by
      ],
    })
  }

  if (patientID) {
    andConditions.push({ patientID })
  }

  if (mobileNo) {
    andConditions.push({ mobileNo })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: any } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Patient.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Patient.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSinglePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findById(id)
  return result
}

const updatePatient = async (
  id: string,
  payload: Partial<IPatient>,
): Promise<IPatient | null> => {
  const result = await Patient.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deletePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findByIdAndDelete(id)
  return result
}

export const PatientService = {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
}
