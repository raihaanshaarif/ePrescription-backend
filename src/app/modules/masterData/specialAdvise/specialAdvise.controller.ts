import { Request, RequestHandler, Response } from 'express'
import { SpecialAdviseService } from './specialAdvise.service'
import httpStatus from 'http-status'
import { ISpecialAdvise } from './specialAdvise.interface'

import { specialAdviseFields } from './specialAdvise.constant'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { paginationFields } from '../../../../constants/pagination'

const createSpecialAdvise: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SpecialAdviseService.createSpecialAdvise(req.body)

    sendResponse<ISpecialAdvise>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Special advise created successfully!',
      data: result,
    })
  },
)

const getAllSpecialAdvises = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, specialAdviseFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await SpecialAdviseService.getAllSpecialAdvises(
    filters,
    paginationOptions,
  )

  sendResponse<ISpecialAdvise[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special advises retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSpecialAdvise = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await SpecialAdviseService.getSingleSpecialAdvise(id)

    sendResponse<ISpecialAdvise>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Special advise retrieved successfully!',
      data: result,
    })
  },
)

const updateSpecialAdvise = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await SpecialAdviseService.updateSpecialAdvise(id, payload)

  sendResponse<ISpecialAdvise>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special advise updated successfully!',
    data: result,
  })
})

const deleteSpecialAdvise = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await SpecialAdviseService.deleteSpecialAdvise(id)

  sendResponse<ISpecialAdvise>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special advise deleted successfully!',
    data: result,
  })
})

export const SpecialAdviseController = {
  createSpecialAdvise,
  getAllSpecialAdvises,
  getSingleSpecialAdvise,
  updateSpecialAdvise,
  deleteSpecialAdvise,
}
