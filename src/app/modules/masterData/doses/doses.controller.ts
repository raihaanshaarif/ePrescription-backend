import { Request, RequestHandler, Response } from 'express'
import { DosesService } from './doses.service'
import httpStatus from 'http-status'
import { IDoses } from './doses.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { dosesFields } from './doses.constant'
import { paginationFields } from '../../../../constants/pagination'

const createDoses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DosesService.createDoses(req.body)

    sendResponse<IDoses>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dose created successfully!',
      data: result,
    })
  },
)

const getAllDoses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, dosesFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await DosesService.getAllDoses(filters, paginationOptions)

  sendResponse<IDoses[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doses retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDoses = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DosesService.getSingleDoses(id)

  sendResponse<IDoses>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dose retrieved successfully!',
    data: result,
  })
})

const updateDoses = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await DosesService.updateDoses(id, payload)

  sendResponse<IDoses>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dose updated successfully!',
    data: result,
  })
})

const deleteDoses = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DosesService.deleteDoses(id)

  sendResponse<IDoses>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dose deleted successfully!',
    data: result,
  })
})

export const DosesController = {
  createDoses,
  getAllDoses,
  getSingleDoses,
  updateDoses,
  deleteDoses,
}
