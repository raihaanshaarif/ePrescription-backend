import { Request, RequestHandler, Response } from 'express'
import { HistoryService } from './history.service'
import httpStatus from 'http-status'
import { IHistory } from './history.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { historyFields } from './history.constant'
import { paginationFields } from '../../../../constants/pagination'

const createHistory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await HistoryService.createHistory(req.body)

    sendResponse<IHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'History entry created successfully!',
      data: result,
    })
  },
)

const getAllHistories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, historyFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await HistoryService.getAllHistories(
    filters,
    paginationOptions,
  )

  sendResponse<IHistory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Histories retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleHistory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await HistoryService.getSingleHistory(id)

  sendResponse<IHistory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'History entry retrieved successfully!',
    data: result,
  })
})

const updateHistory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await HistoryService.updateHistory(id, payload)

  sendResponse<IHistory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'History entry updated successfully!',
    data: result,
  })
})

const deleteHistory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await HistoryService.deleteHistory(id)

  sendResponse<IHistory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'History entry deleted successfully!',
    data: result,
  })
})

export const HistoryController = {
  createHistory,
  getAllHistories,
  getSingleHistory,
  updateHistory,
  deleteHistory,
}
