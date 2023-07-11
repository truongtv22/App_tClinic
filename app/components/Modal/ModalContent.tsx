import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { BackHandler } from "react-native"
import { useMemoizedFn } from "ahooks"

export interface ModalContentProps {
  children?: React.ReactNode
  backPressEnabled: boolean
  onModalShow?: () => void
  onModalHide?: () => void
  onBackButtonPress?: () => boolean
}

const ModalContent = (props: ModalContentProps) => {
  const { children, backPressEnabled, onModalShow, onModalHide, onBackButtonPress } = props

  const backButtonListenerRef = useRef(null)

  useEffect(() => {
    if (onModalShow) onModalShow()
  }, [])

  useEffect(
    () => () => {
      if (onModalHide) onModalHide()
    },
    [],
  )

  const onBackPress = useMemoizedFn(() => {
    if (!backPressEnabled) {
      return true
    }
    if (onBackButtonPress) {
      return onBackButtonPress()
    }
    return false
  })

  useEffect(() => {
    backButtonListenerRef.current = BackHandler.addEventListener("hardwareBackPress", onBackPress)
  }, [])

  useEffect(
    () => () => {
      backButtonListenerRef.current?.remove()
    },
    [],
  )

  return children
}

ModalContent.propTypes = {
  backPressEnabled: PropTypes.bool,
}

ModalContent.defaultProps = {
  backPressEnabled: true,
}

export default ModalContent
