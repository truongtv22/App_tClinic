import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { AppRoute } from "./appRoutes"

export type AuthStackParams = {
  [AppRoute.LOGIN]: undefined
  [AppRoute.REGISTER]: undefined
  [AppRoute.FORGET_PASS]: undefined
}

export type AuthStackScreenProps<T extends keyof AuthStackParams> = NativeStackScreenProps<
  AuthStackParams,
  T
>

const Stack = createNativeStackNavigator<AuthStackParams>()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.LOGIN} component={Screens.LoginScreen} />
      <Stack.Screen name={AppRoute.REGISTER} component={Screens.RegisterScreen} />
    </Stack.Navigator>
  )
}
