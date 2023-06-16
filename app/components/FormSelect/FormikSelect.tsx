import React from "react"
import * as PropTypes from "prop-types"
import { tw } from "react-native-tailwindcss"
import { useField, useFormikContext } from "formik"

import renderNode from "app/utils/renderNode"
import FormControl from "app/components/FormControl/FormControl"
import FormLabel from "app/components/FormLabel/FormLabel"
import FormHelperText from "app/components/FormHelperText/FormHelperText"

import FormSelect from "./FormSelect"

function FormikSelect(props) {
  const {
    name,
    label,
    variant,
    readonly,
    required,
    labelProps,
    helperText,
    helperTextProps,
    containerStyle,
    ...selectProps
  } = props

  const [field, meta, helpers] = useField(name)
  const { submitCount } = useFormikContext()

  const value = field.value
  const { error, touched } = meta

  const isTouched = !!touched || submitCount > 0

  const showError = isTouched && !!error
  const fieldStatus = isTouched ? (showError ? "danger" : "primary") : "basic"

  const onSelectChange = React.useCallback((nextValue) => {
    helpers.setValue(nextValue)
    if (selectProps.onChange) selectProps.onChange(nextValue)
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
      <FormSelect value={value} {...selectProps} variant={variant} onChange={onSelectChange} />
      {(helperText || showError) &&
        renderNode(FormHelperText, showError ? error : helperText, {
          containerStyle: tw.mT1,
          ...helperTextProps,
          status: fieldStatus,
        })}
    </FormControl>
  )
}

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FormikSelect
