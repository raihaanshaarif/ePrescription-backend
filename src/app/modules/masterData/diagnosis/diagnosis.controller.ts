import { Request, RequestHandler, Response } from 'express'
import { DiagnosisService } from './diagnosis.service'
import httpStatus from 'http-status'
import { IDiagnosis } from './diagnosis.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { diagnosisFields } from './diagnosis.constant'
import { paginationFields } from '../../../../constants/pagination'

const createDiagnosis: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DiagnosisService.createDiagnosis(req.body)

    sendResponse<IDiagnosis>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Diagnosis created successfully!',
      data: result,
    })
  },
)

const getAllDiagnoses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, diagnosisFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await DiagnosisService.getAllDiagnoses(
    filters,
    paginationOptions,
  )

  sendResponse<IDiagnosis[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Diagnoses retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDiagnosis = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DiagnosisService.getSingleDiagnosis(id)

  sendResponse<IDiagnosis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Diagnosis retrieved successfully!',
    data: result,
  })
})

const updateDiagnosis = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await DiagnosisService.updateDiagnosis(id, payload)

  sendResponse<IDiagnosis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Diagnosis updated successfully!',
    data: result,
  })
})

const deleteDiagnosis = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DiagnosisService.deleteDiagnosis(id)

  sendResponse<IDiagnosis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Diagnosis deleted successfully!',
    data: result,
  })
})

export const DiagnosisController = {
  createDiagnosis,
  getAllDiagnoses,
  getSingleDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
}
