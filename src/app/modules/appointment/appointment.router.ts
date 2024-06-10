// Appointment.routes.ts

import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { AppointmentController } from './appointment.controller'
import { AppointmentValidation } from './appointment.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(AppointmentValidation.createAppointmentZodSchema),
  AppointmentController.createAppointment,
)
router.get('/', AppointmentController.getAllAppointments)
router.get('/:id', AppointmentController.getSingleAppointment)
router.patch(
  '/:id',
  validateRequest(AppointmentValidation.updateAppointmentZodSchema),
  AppointmentController.updateAppointment,
)
router.delete('/:id', AppointmentController.deleteAppointment)

export const AppointmentRouter = router
