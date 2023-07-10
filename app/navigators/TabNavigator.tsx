import React from "react"
import { tw } from "react-native-tailwindcss"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon, Divider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import Footer from "app/components/Footer/Footer"
import * as Screens from "app/screens"
import { AppRoute } from "./appRoutes"

const Tab = createBottomTabNavigator()

const TabBar = (props) => {
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

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={AppRoute.HOME}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="home" width={16} height={16} />
          ),
        }}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name={AppRoute.APPOINTMENT_LIST}
        options={{
          tabBarLabel: "Lịch hẹn",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="event" width={16} height={16} />
          ),
        }}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name={AppRoute.QUESTION_LIST}
        options={{
          tabBarLabel: "Hỏi đáp",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="help" width={16} height={16} />
          ),
        }}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name={AppRoute.PROFILE}
        options={{
          tabBarLabel: "Hồ sơ",
          tabBarIcon: (iconProps) => (
            <Icon {...iconProps} pack="app" name="doctor" width={16} height={16} />
          ),
        }}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  )
}
