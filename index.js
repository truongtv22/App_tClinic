// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.
import "expo-dev-client"

import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import RNBootSplash from "react-native-bootsplash"

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

registerRootComponent(IgniteApp)

export default IgniteApp
