import express from 'express'
import { SpecialAdviseController } from './specialAdvise.controller'
import { SpecialAdviseValidation } from './specialAdvise.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(SpecialAdviseValidation.createSpecialAdviseZodSchema),
  SpecialAdviseController.createSpecialAdvise,
)
router.get('/', SpecialAdviseController.getAllSpecialAdvises)
router.get('/:id', SpecialAdviseController.getSingleSpecialAdvise)
router.patch(
  '/:id',
  validateRequest(SpecialAdviseValidation.updateSpecialAdviseZodSchema),
  SpecialAdviseController.updateSpecialAdvise,
)
router.delete('/:id', SpecialAdviseController.deleteSpecialAdvise)

export const SpecialAdviseRouter = router
