import React from "react"
import { tw } from "react-native-tailwindcss"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { Icon, Divider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import Footer from "app/components/Footer/Footer"
import * as Screens from "app/screens"
import { AppRoute } from "./appRoutes"

const BottomTab = createBottomTabNavigator()

const BottomTabBar = (props) => {
  const { state, navigation, descriptors } = props

  const onTabSelect = (tabIndex) => {
    const tabSelected = state.routeNames[tabIndex]
    navigation.navigate(tabSelected)
  }

  const renderTab = (route) => {
    const { options } = descriptors[route.key]

    return (
      <BottomNavigationTab key={route.key} icon={options.tabBarIcon} title={options.tabBarLabel} />
    )
  }

  return (
    <Footer>
      <Divider />
      <BottomNavigation indicatorStyle={tw.hPx} selectedIndex={state.index} onSelect={onTabSelect}>
        {state.routes.map(renderTab)}
      </BottomNavigation>
    </Footer>
  )
}

const MainTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBar={BottomTabBar} screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name={AppRoute.HOME}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="home" width={16} height={16} />
          ),
        }}
        component={Screens.HomeScreen}
      />
      <BottomTab.Screen
        name={AppRoute.APPOINTMENT_LIST}
        options={{
          tabBarLabel: "Lịch hẹn",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="event" width={16} height={16} />
          ),
        }}
        component={Screens.HomeScreen}
      />
      <BottomTab.Screen
        name={AppRoute.QUESTION_LIST}
        options={{
          tabBarLabel: "Hỏi đáp",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="help" width={16} height={16} />
          ),
        }}
        component={Screens.HomeScreen}
      />
      <BottomTab.Screen
        name={AppRoute.PROFILE}
        options={{
          tabBarLabel: "Hồ sơ",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="doctor" width={16} height={16} />
          ),
        }}
        component={Screens.ProfileScreen}
      />
    </BottomTab.Navigator>
  )
}

export type MainStackParams = {
  [AppRoute.MAIN_TAB]: undefined
  [AppRoute.HOME]: undefined
  [AppRoute.PROFILE]: undefined
  [AppRoute.PROFILE_EDIT]: undefined
}

export type MainStackScreenProps<T extends keyof MainStackParams> = NativeStackScreenProps<
  MainStackParams,
  T
>

const Stack = createNativeStackNavigator<MainStackParams>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.MAIN_TAB} component={MainTabNavigator} />
      <Stack.Screen name={AppRoute.HOME} component={Screens.HomeScreen} />
      <Stack.Screen name={AppRoute.PROFILE} component={Screens.ProfileScreen} />
      <Stack.Screen name={AppRoute.PROFILE_EDIT} component={Screens.ProfileEditScreen} />
    </Stack.Navigator>
  )
}
