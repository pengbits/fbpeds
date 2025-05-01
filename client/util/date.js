import dayjs from "dayjs"

export const datePretty = (date) => {
  return dayjs(date).format('MMM D YYYY')
}

export const dateTimePretty = (datetime) => {
  const datePretty = dayjs(datetime).format('MMM DD')
  const timePretty = dayjs(datetime).format('h:MM a')
  return `${datePretty} at ${timePretty}`
}

export const birthdatePretty = date => {
  return dayjs(date).format('MM-DD-YYYY')
}

export const dateForAppointment = date => {
  // avoid daylight savings time issue by setting hour far from midnight
  return dayjs(date).format('YYYY-MM-DD')
}