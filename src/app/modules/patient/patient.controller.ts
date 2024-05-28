import { Request, RequestHandler, Response } from 'express'

import httpStatus from 'http-status'

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'

import { paginationFields } from '../../../constants/pagination'
import { IPatient } from './patient.interface'
import { patientFilterableFields } from './patient.constant'
import { PatientService } from './patient.service'

const createPatient: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log('from web', req.body);
    const result = await PatientService.createPatient(req.body)

    sendResponse<IPatient>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Patient created successfully!',
      data: result,
    })
  },
)

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await PatientService.getAllPatients(filters, paginationOptions)

  sendResponse<IPatient[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patients retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await PatientService.getSinglePatient(id)

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully !',
    data: result,
  })
})

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await PatientService.updatePatient(id, payload)

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient updated successfully !',
    data: result,
  })
})
const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await PatientService.deletePatient(id)

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient deleted successfully !',
    data: result,
  })
})

export const PatientController = {
  createPatient,
  getAllPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
}
