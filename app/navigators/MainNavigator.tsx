import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { AppRoute } from "./appRoutes"

export type MainStackParams = {
  [AppRoute.HOME]: undefined
}

export type MainStackScreenProps<T extends keyof MainStackParams> = NativeStackScreenProps<
  MainStackParams,
  T
>

const Stack = createNativeStackNavigator<MainStackParams>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.HOME} component={Screens.HomeScreen} />
    </Stack.Navigator>
  )
}
