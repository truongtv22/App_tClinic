import React from "react"
import { styled } from "@ui-kitten/components"
import { View } from "react-native"

import Toolbar from "app/components/Toolbar/Toolbar"
import useSafeAreaStyle from "app/components/SafeAreaView/useSafeAreaStyle"

function Header(props) {
  const { eva, style, safeAreaEnabled = true, ...restProps } = props

  const safeStyle = useSafeAreaStyle(["top"], style)

  return (
    <View style={[eva.style, style, safeAreaEnabled && safeStyle]}>
      {props.children ? props.children : <Toolbar {...restProps} style={[eva.style, style]} />}
    </View>
  )
}

export default styled("Layout")(Header)
