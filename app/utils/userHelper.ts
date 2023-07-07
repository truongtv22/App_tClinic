/**
 *
 * @param {object} patient
 * @param {string} patient.hoten
 */
export function getFullname(patient) {
  return patient.hoten
}

/**
 *
 * @param {object} patient
 * @param {string} patient.hoten
 */
export function getShortname(patient) {
  const fullname = getFullname(patient)
  return fullname ? convertShortname(fullname) : "user"
}

/**
 *
 * @param {object} user
 * @param {string} user.full_name
 */
export function getShortnameAdmin(user) {
  const fullname = user.full_name
  return fullname ? convertShortname(fullname) : "user"
}

/**
 *
 * @param {string} name
 */
const convertShortname = (name) => {
  name = name.toUpperCase()
  const array = name.split(" ")
  if (name.length === 2 || array.length === 1) return name[0]
  const res = array[array.length - 2].charAt(0) + array[array.length - 1].charAt(0)
  return res
}
