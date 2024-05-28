import express from 'express'
import { DiagnosisController } from './diagnosis.controller'
import { DiagnosisValidation } from './diagnosis.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(DiagnosisValidation.createDiagnosisZodSchema),
  DiagnosisController.createDiagnosis,
)
router.get('/', DiagnosisController.getAllDiagnoses)
router.get('/:id', DiagnosisController.getSingleDiagnosis)
router.patch(
  '/:id',
  validateRequest(DiagnosisValidation.updateDiagnosisZodSchema),
  DiagnosisController.updateDiagnosis,
)
router.delete('/:id', DiagnosisController.deleteDiagnosis)

export const DiagnosisRouter = router
