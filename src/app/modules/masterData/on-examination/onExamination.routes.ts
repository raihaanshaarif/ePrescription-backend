import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { OnExaminationValidation } from './onExamination.validation'
import { OnExaminationController } from './onExamination.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(OnExaminationValidation.createOnExaminationZodSchema),
  OnExaminationController.createOnExamination,
)
router.get('/', OnExaminationController.getAllOnExaminations)
router.get('/:id', OnExaminationController.getSingleOnExamination)
router.patch(
  '/:id',
  validateRequest(OnExaminationValidation.updateOnExaminationZodSchema),
  OnExaminationController.updateOnExamination,
)
router.delete('/:id', OnExaminationController.deleteOnExamination)

export const OnExaminationRouter = router
