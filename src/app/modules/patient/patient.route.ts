// patient.routes.ts

import express from 'express'
import { PatientController } from './patient.controller'
import { PatientValidation } from './patient.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(PatientValidation.createPatientZodSchema),
  PatientController.createPatient,
)
router.get('/', PatientController.getAllPatients)
router.get('/:id', PatientController.getSinglePatient)
router.patch(
  '/:id',
  validateRequest(PatientValidation.updatePatientZodSchema),
  PatientController.updatePatient,
)
router.delete('/:id', PatientController.deletePatient)

export const PatientRouter = router
