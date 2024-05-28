import express from 'express'
import { MedicineController } from './medicine.controller'
import { MedicineValidation } from './medicine.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(MedicineValidation.createMedicineZodSchema),
  MedicineController.createMedicine,
)
router.get('/', MedicineController.getAllMedicines)
router.get('/:id', MedicineController.getSingleMedicine)
router.patch(
  '/:id',
  validateRequest(MedicineValidation.updateMedicineZodSchema),
  MedicineController.updateMedicine,
)
router.delete('/:id', MedicineController.deleteMedicine)

export const MedicineRouter = router
