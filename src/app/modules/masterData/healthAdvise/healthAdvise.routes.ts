import express from 'express'

import { HealthAdviseValidation } from './healthAdvise.validation'
import validateRequest from '../../../middlewares/validateRequest'
import { HealthAdviseController } from './healthAdvise.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(HealthAdviseValidation.createHealthAdviseZodSchema),
  HealthAdviseController.createHealthAdvise,
)
router.get('/', HealthAdviseController.getAllHealthAdvises)
router.get('/:id', HealthAdviseController.getSingleHealthAdvise)
router.patch(
  '/:id',
  validateRequest(HealthAdviseValidation.updateHealthAdviseZodSchema),
  HealthAdviseController.updateHealthAdvise,
)
router.delete('/:id', HealthAdviseController.deleteHealthAdvise)

export const HealthAdviseRouter = router
