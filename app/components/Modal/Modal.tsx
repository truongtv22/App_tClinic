import React, { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"
import { Modal as RkModal } from "@ui-kitten/components"

import styles from "./styles"
import ModalContent from "./ModalContent"

const Modal = forwardRef(function Modal(props, ref) {
  const [visible, setVisible] = useState(false)

  const { onModalShow, onModalHide, dismissEnabled, ...restProps } = props

  const show = () => setVisible(true)

  const hide = () => setVisible(false)

  const onBackdropPress = () => {
    if (dismissEnabled) {
      if (props.onBackdropPress) {
        props.onBackdropPress()
      } else {
        hide()
      }
    }
  }

  useImperativeHandle(ref, () => ({ show, hide }))

  return (
    <RkModal
      {...restProps}
      visible={visible}
      style={[styles.modal, props.style]}
      backdropStyle={[styles.backdrop, props.backdropStyle]}
      onBackdropPress={onBackdropPress}
    >
      <ModalContent
        onModalShow={onModalShow}
        onModalHide={onModalHide}
        backPressEnabled={dismissEnabled}
        onBackButtonPress={onBackdropPress}
      >
        {props.children}
      </ModalContent>
    </RkModal>
  )
})

Modal.propTypes = {
  visible: PropTypes.bool,
  dismissEnabled: PropTypes.bool,
  onModalShow: PropTypes.func,
  onModalHide: PropTypes.func,
}

Modal.defaultProps = {
  dismissEnabled: true,
}

export default Modal
