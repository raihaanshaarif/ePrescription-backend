import express from 'express'
import { PrescriptionController } from './prescription.controller'
import { PrescriptionValidation } from './prescription.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(PrescriptionValidation.createPrescriptionZodSchema),
  PrescriptionController.createPrescription,
)
router.get('/', PrescriptionController.getAllPrescriptions)
router.get('/:id', PrescriptionController.getSinglePrescription)
router.patch(
  '/:id',
  validateRequest(PrescriptionValidation.updatePrescriptionZodSchema),
  PrescriptionController.updatePrescription,
)
router.delete('/:id', PrescriptionController.deletePrescription)

export const PrescriptionRouter = router
