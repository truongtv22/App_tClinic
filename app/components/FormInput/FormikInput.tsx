import React from "react"
import PropTypes from "prop-types"
import { useField, useFormikContext } from "formik"

import renderNode from "app/utils/renderNode"
import FormControl from "app/components/FormControl/FormControl"
import FormLabel from "app/components/FormLabel/FormLabel"
import FormHelperText from "app/components/FormHelperText/FormHelperText"
import FormInput from "./FormInput"

function FormikInput(props, ref) {
  const {
    name,
    label,
    variant,
    readonly,
    required,
    validate,
    parseValue = (v) => v,
    formatValue = (v) => v,
    labelProps,
    helperText,
    helperTextProps,
    containerStyle,
    ...inputProps
  } = props

  const [field, meta, helpers] = useField({ name, validate })
  const { submitCount } = useFormikContext()

  const value = formatValue(field.value)
  const { error, touched } = meta

  const isTouched = !!touched || submitCount > 0

  const showError = isTouched && !!error
  const fieldStatus = isTouched ? (showError ? "danger" : "primary") : "basic"

  const onInputBlur = React.useCallback((event) => {
    helpers.setTouched(true)
    if (inputProps.onBlur) inputProps.onBlur(event)
  }, [])

  const onInputChange = React.useCallback((nextValue) => {
    helpers.setValue(parseValue(nextValue))
    if (inputProps.onChangeText) inputProps.onChangeText(parseValue(nextValue))
  }, [])

  return (
    <FormControl
      status={fieldStatus}
      variant={variant}
      readonly={readonly}
      required={required}
      containerStyle={containerStyle}
    >
      {renderNode(FormLabel, label, labelProps)}
      <FormInput
        ref={ref}
        value={value}
        {...inputProps}
        onBlur={onInputBlur}
        onChangeText={onInputChange}
      />
      {(helperText || showError) &&
        renderNode(FormHelperText, showError ? error : helperText, {
          ...helperTextProps,
          status: fieldStatus,
        })}
    </FormControl>
  )
}

export default React.forwardRef(FormikInput)
