import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { PatientValidation } from './patient.validation'
import { PatientController } from './patient.controller'

const patientRouter = express.Router()

patientRouter.post(
  '/create-patient',
  validateRequest(PatientValidation.createPatientZodSchema),
  PatientController.createPatient,
)

patientRouter.get('/:id', PatientController.getSinglePatient)
patientRouter.get('/', PatientController.getAllPatient)
patientRouter.patch(
  '/:id',
  validateRequest(PatientValidation.updatePatientZodSchema),
  PatientController.updatePatient,
)
patientRouter.delete('/:id', PatientController.deletePatient)

export const PatientRouter = patientRouter
