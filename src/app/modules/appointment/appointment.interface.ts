// File path: models/appointment.interface.ts

import { Model, Types } from 'mongoose'

// Enum to represent appointment statuses
export enum AppointmentStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Hold = 'Hold',
}

// Enum to represent appointment types
export enum AppointmentType {
  Consultation = 'Consultation',
  FollowUp = 'FollowUp',
  Report = 'Report',
  Emergency = 'Emergency',
}

// Interface to represent an appointment object
export interface IAppointment {
  _id?: Types.ObjectId
  serialId?: string
  appointmentNumber?: string
  patientId: Types.ObjectId
  doctorId: Types.ObjectId
  branchId: Types.ObjectId
  date: string // ISO 8601 date string
  time: string // ISO 8601 time string
  status: AppointmentStatus
  appointmentType: AppointmentType
}

export type IAppointmentFilters = {
  searchTerm?: string
  patientId?: string
  doctorId?: string
  date?: string
  status?: AppointmentStatus
  branchId?: string
  appointmentType?: AppointmentType
}

export type AppointmentModel = {
  isPatientExist(
    id: string,
  ): Promise<
    Pick<
      IAppointment,
      | 'patientId'
      | 'doctorId'
      | 'date'
      | 'status'
      | 'appointmentType'
      | 'branchId'
    >
  >
} & Model<IAppointment>
