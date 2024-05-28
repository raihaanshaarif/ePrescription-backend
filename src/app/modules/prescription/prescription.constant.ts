// prescription.constant.ts
export const DURATION_UNIT_ENUM = [
  'day',
  'month',
  'week',
  'hour',
  'minute',
] as const
export type DurationUnit = (typeof DURATION_UNIT_ENUM)[number]
