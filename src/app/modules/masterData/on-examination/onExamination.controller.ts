import { Request, RequestHandler, Response } from 'express'
import { OnExaminationService } from './onExamination.service'
import httpStatus from 'http-status'
import { IOnExamination } from './onExamination.interface'

import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { onExaminationFields } from './onExamination.constant'
import { paginationFields } from '../../../../constants/pagination'
import catchAsync from '../../../../shared/catchAsync'

const createOnExamination: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OnExaminationService.createOnExamination(req.body)

    sendResponse<IOnExamination>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Examination created successfully!',
      data: result,
    })
  },
)

const getAllOnExaminations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, onExaminationFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await OnExaminationService.getAllOnExaminations(
    filters,
    paginationOptions,
  )

  sendResponse<IOnExamination[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Examinations retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleOnExamination = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await OnExaminationService.getSingleOnExamination(id)

    sendResponse<IOnExamination>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Examination retrieved successfully!',
      data: result,
    })
  },
)

const updateOnExamination = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await OnExaminationService.updateOnExamination(id, payload)

  sendResponse<IOnExamination>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Examination updated successfully!',
    data: result,
  })
})

const deleteOnExamination = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await OnExaminationService.deleteOnExamination(id)

  sendResponse<IOnExamination>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Examination deleted successfully!',
    data: result,
  })
})

export const OnExaminationController = {
  createOnExamination,
  getAllOnExaminations,
  getSingleOnExamination,
  updateOnExamination,
  deleteOnExamination,
}
