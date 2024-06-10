import { Schema, model, Document, startSession } from 'mongoose'
import {
  IAppointment,
  AppointmentStatus,
  AppointmentType,
  AppointmentModel,
} from './appointment.interface'

// Parse date from dd/mm/yyyy format to a Date object
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Generate a serial ID based on the current date and existing serials
const generateSerialID = async (dateStr: string): Promise<string> => {
  const date = parseDate(dateStr)
  const dateStart = new Date(date.setHours(0, 0, 0, 0))
  const dateEnd = new Date(date.setHours(23, 59, 59, 999))

  const appointments = await Appointment.find({
    date: {
      $gte: dateStart,
      $lt: dateEnd,
    },
  })
    .sort({ serialId: -1 })
    .exec()

  if (appointments.length > 0 && appointments[0].serialId) {
    const lastSerialId = parseInt(
      appointments[0].serialId.split('-').pop() as string,
      10,
    )
    const newSerialId = (lastSerialId + 1).toString().padStart(3, '0')
    return `${dateStr.replace(/\//g, '')}-${newSerialId}`
  } else {
    return `${dateStr.replace(/\//g, '')}-001`
  }
}

// Define the schema
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
    date: { type: String, required: true },
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

// Ensure unique serialId before validating the document
appointmentSchema.pre('validate', async function (next) {
  const appointment = this as IAppointment & Document

  if (!appointment.serialId) {
    let isUnique = false
    let retries = 5

    while (!isUnique && retries > 0) {
      try {
        const newSerialId = await generateSerialID(appointment.date)
        appointment.serialId = newSerialId
        if (!appointment.appointmentNumber) {
          appointment.appointmentNumber = appointment.serialId
        }
        isUnique = true
      } catch (err) {
        if (
          err instanceof Error &&
          'code' in err &&
          (err as any).code === 11000
        ) {
          // Duplicate key error
          retries--
        } else {
          throw err
        }
      }
    }

    if (!isUnique) {
      throw new Error(
        'Failed to generate unique serialId after multiple attempts',
      )
    }
  }

  next()
})

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
