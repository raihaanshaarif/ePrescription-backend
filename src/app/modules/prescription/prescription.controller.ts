import { Request, RequestHandler, Response } from 'express'
import { PrescriptionService } from './prescription.service'
import httpStatus from 'http-status'
import { IPrescription } from './prescription.interface'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createPrescription: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PrescriptionService.createPrescription(req.body)

    sendResponse<IPrescription>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Prescription created successfully!',
      data: result,
    })
  },
)

const getAllPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'patientID', 'mobileNo'])
  const paginationOptions = pick(req.query, paginationFields)

  const result = await PrescriptionService.getAllPrescriptions(
    filters,
    paginationOptions,
  )

  sendResponse<IPrescription[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Prescriptions retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSinglePrescription = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await PrescriptionService.getSinglePrescription(id)

    sendResponse<IPrescription>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Prescription retrieved successfully!',
      data: result,
    })
  },
)

const updatePrescription = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await PrescriptionService.updatePrescription(id, payload)

  sendResponse<IPrescription>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Prescription updated successfully!',
    data: result,
  })
})

const deletePrescription = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await PrescriptionService.deletePrescription(id)

  sendResponse<IPrescription>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Prescription deleted successfully!',
    data: result,
  })
})

export const PrescriptionController = {
  createPrescription,
  getAllPrescriptions,
  getSinglePrescription,
  updatePrescription,
  deletePrescription,
}
