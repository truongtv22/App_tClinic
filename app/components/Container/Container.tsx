import React from "react"
import { tw } from "react-native-tailwindcss"
import { styled, StyledComponentProps } from "@ui-kitten/components"
import { View, ViewProps } from "react-native"

export type ContainerProps = ViewProps & StyledComponentProps

function Container(props: ContainerProps) {
  const { eva, style, ...restProps } = props

  return <View {...restProps} style={[eva.style, tw.flex1, style]} />
}

export default styled("Layout")(Container)
