import RNToast from 'react-native-root-toast';

export default class Toast {
  // Duration
  static SHORT = 2000;
  static LONG = 3500;

  // Position
  static TOP = 20;
  static BOTTOM = -20;
  static CENTER = 0;

  /**
   * @param {string} text
   * @param {number} duration
   * @param {object} options
   */
  static showText(text, duration, options) {
    this.show(text, {
      duration: duration || Toast.SHORT,
      position: Toast.BOTTOM,
      ...options,
    });
  }

  /**
   * @param {string} text
   * @param {object} options
   */
  static show(text, options) {
    RNToast.show(text, options);
  }
}
