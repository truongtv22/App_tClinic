import React from "react"
import PropTypes from "prop-types"
import { tw } from "react-native-tailwindcss"
import { Text, Icon, Input } from "@ui-kitten/components"
import { View, Platform, TouchableOpacity } from "react-native"

import renderNode from "app/utils/renderNode"
import useFormControlState from "app/components/FormControl/useFormControlState"

const FormInput = React.forwardRef(function FormInput(props, ref) {
  const { icon, captionIcon, onIconPress, textStyle, containerStyle, ...inputProps } = props

  const fcs = useFormControlState({
    props,
    states: ["status", "variant", "disabled", "readonly", "required"],
  })

  const renderIcon = React.useCallback(
    (iconProps) => {
      if (onIconPress) {
        return (
          <TouchableOpacity onPress={onIconPress}>
            {renderNode(Icon, icon, iconProps)}
          </TouchableOpacity>
        )
      }
      return renderNode(Icon, icon, iconProps)
    },
    [icon, onIconPress],
  )

  const renderCaptionIcon = React.useCallback(
    (iconProps) => renderNode(Icon, captionIcon, iconProps),
    [captionIcon],
  )

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{inputProps.value}</Text>
      </View>
    )
  }

  return (
    <View style={containerStyle}>
      <Input
        ref={ref}
        {...fcs}
        accessoryRight={icon && renderIcon}
        {...inputProps}
        textStyle={[
          // Platform.select({ android: tw.pY0 }),
          inputProps.multiline && tw.pT0,
          textStyle,
        ]}
        captionIcon={captionIcon && renderCaptionIcon}
        textAlignVertical={inputProps.multiline && "top"}
      />
    </View>
  )
})

export default FormInput
