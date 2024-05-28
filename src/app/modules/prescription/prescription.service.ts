import { IPrescription } from './prescription.interface'
import { Prescription } from './prescription.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { Patient } from '../patient/patient.model'

const createPrescription = async (
  data: IPrescription,
): Promise<IPrescription> => {
  const result = await Prescription.create(data)
  return result
}

const getAllPrescriptions = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IPrescription[]>> => {
  const { searchTerm, patientID, mobileNo, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions: any[] = []

  if (searchTerm) {
    andConditions.push({
      $or: [
        { 'patient.patientID': { $regex: searchTerm, $options: 'i' } },
        { 'patient.mobileNo': { $regex: searchTerm, $options: 'i' } },
      ],
    })
  }

  if (patientID) {
    const patient = await Patient.findOne({ patientID })
    if (patient) {
      andConditions.push({ patient: patient._id })
    } else {
      andConditions.push({ patient: null })
    }
  }

  if (mobileNo) {
    const patient = await Patient.findOne({ mobileNo })
    if (patient) {
      andConditions.push({ patient: patient._id })
    } else {
      andConditions.push({ patient: null })
    }
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: any } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Prescription.find(whereConditions)
    .populate('patient')
    .populate('onExamination')
    .populate('chiefComplaints.complaint')
    .populate('chiefComplaints.duration')
    .populate('history')
    .populate('diagnosis')
    .populate('investigation')
    .populate('medication.medicine')
    .populate('medication.dose')
    .populate('medication.duration')
    .populate('medication.advise')
    .populate('advise')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Prescription.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSinglePrescription = async (
  id: string,
): Promise<IPrescription | null> => {
  const result = await Prescription.findById(id)
    .populate('patient')
    .populate('onExamination')
    .populate('chiefComplaints.complaint')
    .populate('chiefComplaints.duration')
    .populate('history')
    .populate('diagnosis')
    .populate('investigation')
    .populate('medication.medicine')
    .populate('medication.dose')
    .populate('medication.duration')
    .populate('medication.advise')
    .populate('advise')
  return result
}

const updatePrescription = async (
  id: string,
  payload: Partial<IPrescription>,
): Promise<IPrescription | null> => {
  const result = await Prescription.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .populate('patient')
    .populate('onExamination')
    .populate('chiefComplaints.complaint')
    .populate('chiefComplaints.duration')
    .populate('history')
    .populate('diagnosis')
    .populate('investigation')
    .populate('medication.medicine')
    .populate('medication.dose')
    .populate('medication.duration')
    .populate('medication.advise')
    .populate('advise')
  return result
}

const deletePrescription = async (
  id: string,
): Promise<IPrescription | null> => {
  const result = await Prescription.findByIdAndDelete(id)
  return result
}

export const PrescriptionService = {
  createPrescription,
  getAllPrescriptions,
  getSinglePrescription,
  updatePrescription,
  deletePrescription,
}
