import express from 'express'
import { UserRouter } from '../modules/user/user.router'
import { AuthRoutes } from '../modules/auth/auth.route'
import { PatientRouter } from '../modules/patient/patient.route'
import { ChiefComplaintRouter } from '../modules/masterData/chief-compaint/chiefComplaint.route'
import { OnExaminationRouter } from '../modules/masterData/on-examination/onExamination.routes'
import { HistoryRouter } from '../modules/masterData/history/history.routes'
import { DiagnosisRouter } from '../modules/masterData/diagnosis/diagnosis.routes'
import { HealthAdviseRouter } from '../modules/masterData/healthAdvise/healthAdvise.routes'

import { DosesRouter } from '../modules/masterData/doses/doses.routes'
import { DoseDurationRouter } from '../modules/masterData/doseDuration/doseDuration.routes'
import { MealAdministrationRouter } from '../modules/masterData/mealAdministration/mealAdministration.routes'
import { SpecialAdviseRouter } from '../modules/masterData/specialAdvise/specialAdvise.routes'
import { PrescriptionRouter } from '../modules/prescription/prescription.routes'
import { InvestigationRouter } from '../modules/masterData/investigation/investigation.routes'
import { MedicineRouter } from '../modules/masterData/medicine/medicine.routes'
import { AppointmentRouter } from '../modules/appointment/appointment.router'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/patient',
    route: PatientRouter,
  },
  {
    path: '/chief-complaint',
    route: ChiefComplaintRouter,
  },
  {
    path: '/on-examination',
    route: OnExaminationRouter,
  },
  {
    path: '/history',
    route: HistoryRouter, // Add the history route
  },
  {
    path: '/diagnosis',
    route: DiagnosisRouter, // Add the diagnosis route
  },
  {
    path: '/health-advise',
    route: HealthAdviseRouter, // Add the health advise route
  },
  {
    path: '/special-advise',
    route: SpecialAdviseRouter, // Add the special advise route
  },
  {
    path: '/doses',
    route: DosesRouter, // Add the doses route
  },
  {
    path: '/investigation',
    route: InvestigationRouter,
  },
  {
    path: '/medicine',
    route: MedicineRouter,
  },
  {
    path: '/dose-duration',
    route: DoseDurationRouter, // Add the dose duration route
  },
  {
    path: '/meal-administration',
    route: MealAdministrationRouter, // Add the dose duration route
  },
  {
    path: '/prescription',
    route: PrescriptionRouter, // Add the prescription route
  },
  {
    path: '/appointment',
    route: AppointmentRouter, // Add the prescription route
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
