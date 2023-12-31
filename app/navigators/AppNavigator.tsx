/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import Config from "app/config"
import { api } from "app/services/api"
import { useStores } from "app/models"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { AppRoute } from "./appRoutes"
import { AuthNavigator } from "./AuthNavigator"
import { MainNavigator } from "./MainNavigator"
import { TabNavigator } from "./TabNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParams = {
  [AppRoute.TAB]: undefined
  [AppRoute.AUTH]: undefined
  [AppRoute.MAIN]: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParams> = NativeStackScreenProps<
  AppStackParams,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParams>()

const AppStack = observer(function AppStack() {
  const {
    authStore: { token, isAuthenticated },
    userStore: { getUserInfo },
  } = useStores()

  useEffect(() => {
    api.setToken(token)
  }, [token])

  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo()
    }
  }, [isAuthenticated])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={isAuthenticated ? AppRoute.MAIN : AppRoute.AUTH}
    >
      <Stack.Screen name={AppRoute.TAB} component={TabNavigator} />
      {isAuthenticated ? (
        <Stack.Screen name={AppRoute.MAIN} component={MainNavigator} />
      ) : (
        <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
})
