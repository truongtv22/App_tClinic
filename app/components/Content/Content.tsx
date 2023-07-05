import React from "react"
import { tw } from "react-native-tailwindcss"
import { LayoutProps } from "@ui-kitten/components"
import { View, ScrollView, StyleProp, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import useStyled from "app/utils/useStyled"
import useSafeAreaStyle from "app/components/SafeAreaView/useSafeAreaStyle"

interface ContentProps extends LayoutProps {
  scrollEnabled?: boolean
  safeAreaEnabled?: boolean
  keyboardEnabled?: boolean
  contentContainerStyle?: StyleProp<ViewStyle> | undefined
}

export default function Content(props: ContentProps) {
  const { eva } = useStyled("Layout", props)

  const {
    style,
    children,
    scrollEnabled = true,
    safeAreaEnabled = true,
    keyboardEnabled = false,
    contentContainerStyle,
    ...restProps
  } = props

  const safeStyle = useSafeAreaStyle(["bottom"], style)
  const safeContentStyle = useSafeAreaStyle(["bottom"], contentContainerStyle)

  const Component = keyboardEnabled ? KeyboardAwareScrollView : ScrollView

  if (scrollEnabled) {
    return (
      <Component
        {...restProps}
        style={[eva.style, style]}
        contentContainerStyle={[
          tw.flexGrow,
          contentContainerStyle,
          safeAreaEnabled && safeContentStyle,
        ]}
      >
        {children}
      </Component>
    )
  }
  return (
    <View {...restProps} style={[tw.flex1, eva.style, style, safeAreaEnabled && safeStyle]}>
      {children}
    </View>
  )
}

Content.defaultProps = {
  level: "2",
}
