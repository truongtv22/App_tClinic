import React from "react"
import { View } from "react-native"
import { Spinner } from "@ui-kitten/components"
import tw from "app/theme/tailwind"

const Loading = () => {
  return (
    <View style={tw.style("absolute inset-0 flex-1 items-center justify-center bg-black/60")}>
      <Spinner />
    </View>
  )
}

export default Loading
