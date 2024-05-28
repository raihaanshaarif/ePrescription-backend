import { Request, RequestHandler, Response } from 'express'
import { MealAdministrationService } from './mealAdministration.service'
import httpStatus from 'http-status'
import { IMealAdministration } from './mealAdministration.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { mealAdministrationFields } from './mealAdministration.constant'
import { paginationFields } from '../../../../constants/pagination'

const createMealAdministration: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MealAdministrationService.createMealAdministration(
      req.body,
    )

    sendResponse<IMealAdministration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal administration entry created successfully!',
      data: result,
    })
  },
)

const getAllMealAdministrations = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, mealAdministrationFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await MealAdministrationService.getAllMealAdministrations(
      filters,
      paginationOptions,
    )

    sendResponse<IMealAdministration[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal administrations retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSingleMealAdministration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result =
      await MealAdministrationService.getSingleMealAdministration(id)

    sendResponse<IMealAdministration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal administration entry retrieved successfully!',
      data: result,
    })
  },
)

const updateMealAdministration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const payload = req.body

    const result = await MealAdministrationService.updateMealAdministration(
      id,
      payload,
    )

    sendResponse<IMealAdministration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal administration entry updated successfully!',
      data: result,
    })
  },
)

const deleteMealAdministration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await MealAdministrationService.deleteMealAdministration(id)

    sendResponse<IMealAdministration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal administration entry deleted successfully!',
      data: result,
    })
  },
)

export const MealAdministrationController = {
  createMealAdministration,
  getAllMealAdministrations,
  getSingleMealAdministration,
  updateMealAdministration,
  deleteMealAdministration,
}
