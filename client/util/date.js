import dayjs from "dayjs"

export const datePretty = (date) => {
  return dayjs(date).format('MMM D')
}

export const dateTimePretty = (datetime) => {
  const datePretty = dayjs(datetime).format('MMM DD')
  const timePretty = dayjs(datetime).format('H:MM')
  return `${datePretty} at ${timePretty}`
}