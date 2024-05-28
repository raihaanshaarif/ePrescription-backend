import { Request, RequestHandler, Response } from 'express'
import { ChiefComplaintService } from './chiefComplaint.service'
import httpStatus from 'http-status'
import { IChiefComplaint } from './chiefComplaint.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'

import { paginationFields } from '../../../../constants/pagination'
import { chiefComplaintFields } from './chiefComplaint.constant'

const createChiefComplaint: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ChiefComplaintService.createChiefComplaint(req.body)

    sendResponse<IChiefComplaint>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chief complaint created successfully!',
      data: result,
    })
  },
)

const getAllChiefComplaints = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, chiefComplaintFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await ChiefComplaintService.getAllChiefComplaints(
      filters,
      paginationOptions,
    )

    sendResponse<IChiefComplaint[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chief complaints retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSingleChiefComplaint = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await ChiefComplaintService.getSingleChiefComplaint(id)

    sendResponse<IChiefComplaint>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chief complaint retrieved successfully!',
      data: result,
    })
  },
)

const updateChiefComplaint = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await ChiefComplaintService.updateChiefComplaint(id, payload)

  sendResponse<IChiefComplaint>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chief complaint updated successfully!',
    data: result,
  })
})

const deleteChiefComplaint = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ChiefComplaintService.deleteChiefComplaint(id)

  sendResponse<IChiefComplaint>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chief complaint deleted successfully!',
    data: result,
  })
})

export const ChiefComplaintController = {
  createChiefComplaint,
  getAllChiefComplaints,
  getSingleChiefComplaint,
  updateChiefComplaint,
  deleteChiefComplaint,
}
