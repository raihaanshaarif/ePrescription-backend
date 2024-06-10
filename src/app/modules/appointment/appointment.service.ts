// File path: services/appointment.service.ts

import ApiError from '../../../errors/apiError'
import httpStatus from 'http-status'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IAppointment } from './appointment.interface'
import { Appointment } from './appointment.model'

const createAppointment = async (data: IAppointment): Promise<IAppointment> => {
  const result = await Appointment.create(data)
  return result
}

const getAllAppointments = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAppointment[]>> => {
  const {
    searchTerm,
    patientId,
    doctorId,
    date,
    status,
    branchId,
    appointmentType,
    ...filtersData
  } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: [
        { appointmentNumber: { $regex: searchTerm, $options: 'i' } },
        { serialId: { $regex: searchTerm, $options: 'i' } },
      ],
    })
  }

  if (patientId) {
    andConditions.push({ patientId })
  }

  if (doctorId) {
    andConditions.push({ doctorId })
  }

  if (date) {
    andConditions.push({ date })
  }

  if (status) {
    andConditions.push({ status })
  }

  if (branchId) {
    andConditions.push({ branchId })
  }

  if (appointmentType) {
    andConditions.push({ appointmentType })
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

  const result = await Appointment.find(whereConditions)
    .populate('patientId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Appointment.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAppointment = async (
  id: string,
): Promise<IAppointment | null> => {
  const result = await Appointment.findById(id)
  return result
}

const updateAppointment = async (
  id: string,
  payload: Partial<IAppointment>,
): Promise<IAppointment | null> => {
  const result = await Appointment.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteAppointment = async (id: string): Promise<IAppointment | null> => {
  const result = await Appointment.findByIdAndDelete(id)
  return result
}

export const AppointmentService = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
}
