import React, { useRef } from "react"
import PropTypes from "prop-types"
import { BackHandler } from "react-native"
import { useMemoizedFn } from "ahooks"

const ModalContent = (props) => {
  const { children, backPressEnabled } = props

  const backButtonListenerRef = useRef(null)

  React.useEffect(() => {
    props.onModalShow?.()
  }, [])

  React.useEffect(
    () => () => {
      props.onModalHide?.()
    },
    [],
  )

  const onBackPress = useMemoizedFn(() => {
    if (!backPressEnabled) {
      return true
    }
    return props.onBackButtonPress?.()
  })

  React.useEffect(() => {
    backButtonListenerRef.current = BackHandler.addEventListener("hardwareBackPress", onBackPress)
  }, [])

  React.useEffect(
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
