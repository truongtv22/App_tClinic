import React from "react"
import PropTypes from "prop-types"
import { tw } from "react-native-tailwindcss"
import { View } from "react-native"
import { Text, Icon, styled } from "@ui-kitten/components"

import renderNode from "app/utils/renderNode"
import useFormControlState from "app/components/FormControl/useFormControlState"

function FormLabel(props) {
  const {
    eva,
    children,
    required,
    leading,
    trailing,
    textStyle,
    asteriskStyle,
    containerStyle,
    leadingContainerStyle,
    trailingContainerStyle,
    ...textProps
  } = props

  const {
    iconWidth,
    iconHeight,
    labelColor,
    labelFontSize,
    labelFontFamily,
    labelFontWeight,
    labelLineHeight,
    labelMarginBottom,
  } = eva.style

  const computedStyle = {
    container: {
      marginBottom: labelMarginBottom,
    },
    text: {
      color: labelColor,
      fontSize: labelFontSize,
      fontFamily: labelFontFamily,
      fontWeight: labelFontWeight,
      lineHeight: labelLineHeight,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: labelColor,
    },
    asterisk: {
      color: eva.theme["color-danger-500"],
    },
  }

  const fcs = useFormControlState({
    props,
    states: ["status", "variant", "disabled", "readonly", "required"],
  })

  const showAsterisk = !fcs.readonly && fcs.required

  return (
    <View style={[tw.flexRow, tw.itemsEnd, computedStyle.container, containerStyle]}>
      {!!leading && (
        <View style={[tw.pR1, leadingContainerStyle]}>
          {renderNode(Icon, leading, computedStyle.icon)}
        </View>
      )}
      <Text {...textProps} style={[computedStyle.text, textStyle]}>
        {children}
        {showAsterisk && <Text style={[computedStyle.asterisk, asteriskStyle]}>&thinsp;*</Text>}
      </Text>
      {!!trailing && (
        <View style={[tw.pR1, trailingContainerStyle]}>
          {renderNode(Icon, trailing, computedStyle.icon)}
        </View>
      )}
    </View>
  )
}

export default styled("Input")(FormLabel)
