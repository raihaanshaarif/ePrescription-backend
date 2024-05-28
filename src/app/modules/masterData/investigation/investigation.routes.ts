import express from 'express'
import { InvestigationController } from './investigation.controller'
import { InvestigationValidation } from './investigation.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(InvestigationValidation.createInvestigationZodSchema),
  InvestigationController.createInvestigation,
)
router.get('/', InvestigationController.getAllInvestigations)
router.get('/:id', InvestigationController.getSingleInvestigation)
router.patch(
  '/:id',
  validateRequest(InvestigationValidation.updateInvestigationZodSchema),
  InvestigationController.updateInvestigation,
)
router.delete('/:id', InvestigationController.deleteInvestigation)

export const InvestigationRouter = router
