import { Schema, model, Document, Types } from 'mongoose'
import {
  IAppointment,
  AppointmentStatus,
  AppointmentType,
  AppointmentModel,
} from './appointment.interface'

const appointmentSchema = new Schema<IAppointment>(
  {
    serialId: {
      type: String,
      unique: true,
      required: true,
    },
    appointmentNumber: { type: String },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      required: true,
    },
    appointmentType: {
      type: String,
      enum: Object.values(AppointmentType),
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

appointmentSchema.statics.isPatientExist = async function (
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
> {
  return await this.findOne(
    { patientId: id },
    {
      patientId: 1,
      doctorId: 1,
      date: 1,
      status: 1,
      appointmentType: 1,
      branchId: 1,
    },
  ).lean()
}

export const Appointment = model<IAppointment, AppointmentModel>(
  'Appointment',
  appointmentSchema,
)
