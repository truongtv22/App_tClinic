/**
 *
 * @param {object} user
 * @param {string} user.hoten
 */
export function getFullname(user) {
  return user.hoten
}

/**
 *
 * @param {object} user
 * @param {string} user.hoten
 */
export function getShortname(user) {
  const fullname = getFullname(user)
  return convertShortname(fullname)
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
