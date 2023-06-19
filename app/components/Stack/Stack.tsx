import React from "react"
import { View, ViewStyle, StyleProp } from "react-native"

import { getSpacedChildren } from "./utils"

export interface StackProps {
  children?: JSX.Element[] | JSX.Element
  space?: number | string
  style?: StyleProp<ViewStyle>
  divider?: JSX.Element
  wrap?: "wrap" | "nowrap" | "wrap-reverse"
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
}

export const Stack = ({
  children,
  divider,
  space,
  style,
  wrap,
  align,
  justify,
  direction = "column",
  ...props
}: StackProps) => {
  const baseStyle = React.useMemo(
    () => ({
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: align,
      justifyContent: justify,
    }),
    [direction, wrap, align, justify],
  )

  const axis = React.useMemo(() => {
    return direction === "row" || direction === "row-reverse" ? "X" : "Y"
  }, [direction])

  return (
    <View {...props} style={[baseStyle, style]}>
      {getSpacedChildren(
        children,
        space,
        axis,
        divider,
      )}
    </View>
  )
}
