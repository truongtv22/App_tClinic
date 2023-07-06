import { createRef } from "react"

export const loadingRef = createRef<any>()

export const show = () => loadingRef.current?.show()

export const hide = () => loadingRef.current?.hide()
