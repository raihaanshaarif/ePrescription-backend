import { Request, RequestHandler, Response } from 'express'
import { HealthAdviseService } from './healthAdvise.service'
import httpStatus from 'http-status'
import { IHealthAdvise } from './healthAdvise.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { healthAdviseFields } from './healthAdvise.constant'
import { paginationFields } from '../../../../constants/pagination'

const createHealthAdvise: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await HealthAdviseService.createHealthAdvise(req.body)

    sendResponse<IHealthAdvise>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Health advise created successfully!',
      data: result,
    })
  },
)

const getAllHealthAdvises = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, healthAdviseFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await HealthAdviseService.getAllHealthAdvises(
    filters,
    paginationOptions,
  )

  sendResponse<IHealthAdvise[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Health advises retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleHealthAdvise = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await HealthAdviseService.getSingleHealthAdvise(id)

    sendResponse<IHealthAdvise>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Health advise retrieved successfully!',
      data: result,
    })
  },
)

const updateHealthAdvise = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await HealthAdviseService.updateHealthAdvise(id, payload)

  sendResponse<IHealthAdvise>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Health advise updated successfully!',
    data: result,
  })
})

const deleteHealthAdvise = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await HealthAdviseService.deleteHealthAdvise(id)

  sendResponse<IHealthAdvise>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Health advise deleted successfully!',
    data: result,
  })
})

export const HealthAdviseController = {
  createHealthAdvise,
  getAllHealthAdvises,
  getSingleHealthAdvise,
  updateHealthAdvise,
  deleteHealthAdvise,
}
