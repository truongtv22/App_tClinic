import { create, useDeviceContext } from "twrnc"
export { useDeviceContext, useAppColorScheme } from "twrnc"

const tw = create()

export const useTailwind = () => {
  useDeviceContext(tw)
  return tw
}

export default tw
