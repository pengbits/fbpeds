export const visitTypePretty = (visitType) => {
  return visitType == 'WELL' ? 'Well' : 'Sick'
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}