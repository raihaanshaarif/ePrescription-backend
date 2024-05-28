import { Request, RequestHandler, Response } from 'express'
import { DoseDurationService } from './doseDuration.service'
import httpStatus from 'http-status'
import { IDoseDuration } from './doseDuration.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { doseDurationFields } from './doseDuration.constant'
import { paginationFields } from '../../../../constants/pagination'

const createDoseDuration: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoseDurationService.createDoseDuration(req.body)

    sendResponse<IDoseDuration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dose duration created successfully!',
      data: result,
    })
  },
)

const getAllDoseDurations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doseDurationFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await DoseDurationService.getAllDoseDurations(
    filters,
    paginationOptions,
  )

  sendResponse<IDoseDuration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dose durations retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDoseDuration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await DoseDurationService.getSingleDoseDuration(id)

    sendResponse<IDoseDuration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dose duration retrieved successfully!',
      data: result,
    })
  },
)

const updateDoseDuration = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await DoseDurationService.updateDoseDuration(id, payload)

  sendResponse<IDoseDuration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dose duration updated successfully!',
    data: result,
  })
})

const deleteDoseDuration = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DoseDurationService.deleteDoseDuration(id)

  sendResponse<IDoseDuration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dose duration deleted successfully!',
    data: result,
  })
})

export const DoseDurationController = {
  createDoseDuration,
  getAllDoseDurations,
  getSingleDoseDuration,
  updateDoseDuration,
  deleteDoseDuration,
}
