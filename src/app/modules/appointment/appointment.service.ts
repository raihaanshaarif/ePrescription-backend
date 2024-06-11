import ApiError from '../../../errors/apiError'
import httpStatus from 'http-status'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IAppointment } from './appointment.interface'
import { Appointment } from './appointment.model'

// Parse date from dd/mm/yyyy format to a Date object
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Generate a serial ID based on the current date and existing serials
const generateSerialID = async (date: Date): Promise<string> => {
  const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  const dateStart = new Date(date.setHours(0, 0, 0, 0))
  const dateEnd = new Date(date.setHours(23, 59, 59, 999))

  // Debugging: Log the date range
  console.log(`Finding appointments between ${dateStart} and ${dateEnd}`)

  const latestAppointment = await Appointment.findOne({
    date: {
      $gte: dateStart,
      $lt: dateEnd,
    },
  }).sort({ serialId: -1 })

  // Debugging: Log the latest appointment found
  console.log('Latest appointment found:', latestAppointment)

  let newSerialId
  if (latestAppointment && latestAppointment.serialId) {
    const lastSerialId = parseInt(
      latestAppointment.serialId.split('-').pop() as string,
      10,
    )
    newSerialId = (lastSerialId + 1).toString().padStart(3, '0')
  } else {
    newSerialId = '001'
  }

  return `${dateStr.replace(/\//g, '')}-${newSerialId}`
}

const createAppointment = async (data: IAppointment): Promise<IAppointment> => {
  let retries = 5
  while (retries > 0) {
    try {
      // Ensure the date is a Date object
      const dateObj = new Date(data.date)
      // Generate serial ID before creating the appointment
      const serialId = await generateSerialID(dateObj)
      data.serialId = serialId
      data.appointmentNumber = serialId

      const result = await Appointment.create(data)
      return result
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 11000
      ) {
        // Duplicate key error
        retries -= 1
        if (retries === 0) {
          throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Failed to generate unique serialId after multiple attempts',
          )
        }
      } else {
        throw error
      }
    }
  }
  throw new ApiError(
    httpStatus.INTERNAL_SERVER_ERROR,
    'Failed to create appointment',
  )
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
