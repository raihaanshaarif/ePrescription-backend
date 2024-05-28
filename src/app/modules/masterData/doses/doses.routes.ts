import express from 'express'
import { DosesController } from './doses.controller'
import { DosesValidation } from './doses.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(DosesValidation.createDosesZodSchema),
  DosesController.createDoses,
)
router.get('/', DosesController.getAllDoses)
router.get('/:id', DosesController.getSingleDoses)
router.patch(
  '/:id',
  validateRequest(DosesValidation.updateDosesZodSchema),
  DosesController.updateDoses,
)
router.delete('/:id', DosesController.deleteDoses)

export const DosesRouter = router
