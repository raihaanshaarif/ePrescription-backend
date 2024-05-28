import express from 'express'
import { ChiefComplaintController } from './chiefComplaint.controller'
import { ChiefComplaintValidation } from './chiefComplaint.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-chief-complaint',
  validateRequest(ChiefComplaintValidation.createChiefComplaintZodSchema),
  ChiefComplaintController.createChiefComplaint,
)
router.get('/', ChiefComplaintController.getAllChiefComplaints)
router.get('/:id', ChiefComplaintController.getSingleChiefComplaint)
router.patch(
  '/:id',
  validateRequest(ChiefComplaintValidation.updateChiefComplaintZodSchema),
  ChiefComplaintController.updateChiefComplaint,
)
router.delete('/:id', ChiefComplaintController.deleteChiefComplaint)

export const ChiefComplaintRouter = router
