import { Request, RequestHandler, Response } from 'express'
import { MedicineService } from './medicine.service'
import httpStatus from 'http-status'
import { IMedicine } from './medicine.interface'
import catchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import pick from '../../../../shared/pick'
import { paginationFields } from '../../../../constants/pagination'

const createMedicine: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MedicineService.createMedicine(req.body)

    sendResponse<IMedicine>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Medicine created successfully!',
      data: result,
    })
  },
)

const getAllMedicines = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'companyName',
    'medicineName',
    'type',
    'generic',
  ])
  const paginationOptions = pick(req.query, paginationFields)

  const result = await MedicineService.getAllMedicines(
    filters,
    paginationOptions,
  )

  sendResponse<IMedicine[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicines retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await MedicineService.getSingleMedicine(id)

  sendResponse<IMedicine>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine retrieved successfully!',
    data: result,
  })
})

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await MedicineService.updateMedicine(id, payload)

  sendResponse<IMedicine>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine updated successfully!',
    data: result,
  })
})

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await MedicineService.deleteMedicine(id)

  sendResponse<IMedicine>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine deleted successfully!',
    data: result,
  })
})

export const MedicineController = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
}
