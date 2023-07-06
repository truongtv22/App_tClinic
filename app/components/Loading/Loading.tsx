import React, { useState, useImperativeHandle } from "react"
import { View } from "react-native"
import { Spinner } from "@ui-kitten/components"
import tw from "app/theme/tailwind"

export const Loading = React.forwardRef(function Loading(props, ref) {
  const [loading, setLoading] = useState(false)

  const show = () => setLoading(true)

  const hide = () => setLoading(false)

  useImperativeHandle(ref, () => ({ show, hide }))

  if (loading) {
    return (
      <View style={tw.style("absolute inset-0 flex-1 items-center justify-center bg-black/60")}>
        <Spinner />
      </View>
    )
  }
  return null
})
