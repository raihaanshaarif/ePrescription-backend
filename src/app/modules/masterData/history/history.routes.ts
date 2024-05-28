import express from 'express'
import { HistoryController } from './history.controller'
import { HistoryValidation } from './history.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(HistoryValidation.createHistoryZodSchema),
  HistoryController.createHistory,
)
router.get('/', HistoryController.getAllHistories)
router.get('/:id', HistoryController.getSingleHistory)
router.patch(
  '/:id',
  validateRequest(HistoryValidation.updateHistoryZodSchema),
  HistoryController.updateHistory,
)
router.delete('/:id', HistoryController.deleteHistory)

export const HistoryRouter = router
