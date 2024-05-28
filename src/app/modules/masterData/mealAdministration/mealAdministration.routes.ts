import express from 'express'
import { MealAdministrationController } from './mealAdministration.controller'
import { MealAdministrationValidation } from './mealAdministration.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(
    MealAdministrationValidation.createMealAdministrationZodSchema,
  ),
  MealAdministrationController.createMealAdministration,
)
router.get('/', MealAdministrationController.getAllMealAdministrations)
router.get('/:id', MealAdministrationController.getSingleMealAdministration)
router.patch(
  '/:id',
  validateRequest(
    MealAdministrationValidation.updateMealAdministrationZodSchema,
  ),
  MealAdministrationController.updateMealAdministration,
)
router.delete('/:id', MealAdministrationController.deleteMealAdministration)

export const MealAdministrationRouter = router
