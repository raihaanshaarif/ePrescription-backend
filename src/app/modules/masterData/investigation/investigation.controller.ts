import { Request, RequestHandler, Response } from 'express'
import { InvestigationService } from './investigation.service'
import httpStatus from 'http-status'
import { IInvestigation } from './investigation.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import { paginationFields } from '../../../../constants/pagination'
import pick from '../../../../shared/pick'

const createInvestigation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await InvestigationService.createInvestigation(req.body)

    sendResponse<IInvestigation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Investigation created successfully!',
      data: result,
    })
  },
)

const getAllInvestigations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['nameEnglish'])
  const paginationOptions = pick(req.query, paginationFields)

  const result = await InvestigationService.getAllInvestigations(
    filters,
    paginationOptions,
  )

  sendResponse<IInvestigation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investigations retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleInvestigation = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await InvestigationService.getSingleInvestigation(id)

    sendResponse<IInvestigation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Investigation retrieved successfully!',
      data: result,
    })
  },
)

const updateInvestigation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await InvestigationService.updateInvestigation(id, payload)

  sendResponse<IInvestigation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investigation updated successfully!',
    data: result,
  })
})

const deleteInvestigation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await InvestigationService.deleteInvestigation(id)

  sendResponse<IInvestigation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investigation deleted successfully!',
    data: result,
  })
})

export const InvestigationController = {
  createInvestigation,
  getAllInvestigations,
  getSingleInvestigation,
  updateInvestigation,
  deleteInvestigation,
}
