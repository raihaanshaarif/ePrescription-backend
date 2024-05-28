import express from 'express'
import { DoseDurationController } from './doseDuration.controller'
import { DoseDurationValidation } from './doseDuration.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(DoseDurationValidation.createDoseDurationZodSchema),
  DoseDurationController.createDoseDuration,
)
router.get('/', DoseDurationController.getAllDoseDurations)
router.get('/:id', DoseDurationController.getSingleDoseDuration)
router.patch(
  '/:id',
  validateRequest(DoseDurationValidation.updateDoseDurationZodSchema),
  DoseDurationController.updateDoseDuration,
)
router.delete('/:id', DoseDurationController.deleteDoseDuration)

export const DoseDurationRouter = router
