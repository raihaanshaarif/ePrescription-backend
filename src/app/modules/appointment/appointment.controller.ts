// Appointment.controller.ts

import { Request, RequestHandler, Response } from 'express'

import httpStatus from 'http-status'

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { AppointmentService } from './appointment.service'
import { IAppointment } from './appointment.interface'

const createAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppointmentService.createAppointment(req.body)

    sendResponse<IAppointment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment created successfully!',
      data: result,
    })
  },
)

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'appointmentID', 'mobileNo'])
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AppointmentService.getAllAppointments(
    filters,
    paginationOptions,
  )

  sendResponse<IAppointment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointments retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AppointmentService.getSingleAppointment(id)

  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment retrieved successfully!',
    data: result,
  })
})

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await AppointmentService.updateAppointment(id, payload)

  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment updated successfully!',
    data: result,
  })
})

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AppointmentService.deleteAppointment(id)

  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment deleted successfully!',
    data: result,
  })
})

export const AppointmentController = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
}
