import express from 'express'
import { UserRouter } from '../modules/user/user.router'
import { AuthRoutes } from '../modules/auth/auth.route'
import { PatientRouter } from '../modules/patient/patient.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
