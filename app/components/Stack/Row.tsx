import React from "react"
import { Stack, StackProps } from "./Stack"

export const Row = (props: StackProps) => {
  return <Stack direction="row" {...props} />
}
