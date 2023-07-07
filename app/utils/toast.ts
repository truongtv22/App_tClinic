import RNToast from "react-native-root-toast"

export default class Toast {
  // Duration
  static SHORT = RNToast.durations.SHORT
  static LONG = RNToast.durations.LONG

  // Position
  static TOP = RNToast.positions.TOP
  static BOTTOM = RNToast.positions.BOTTOM
  static CENTER = RNToast.positions.CENTER

  /**
   * @param {string} text
   * @param {number} duration
   * @param {object} options
   */
  static showText(text, duration?, options?) {
    this.show(text, {
      duration: duration || Toast.SHORT,
      position: Toast.BOTTOM,
      ...options,
    })
  }

  /**
   * @param {string} text
   * @param {object} options
   */
  static show(text, options) {
    RNToast.show(text, options)
  }
}
