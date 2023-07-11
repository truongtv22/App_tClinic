import React from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Icon, Divider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import Footer from "app/components/Footer/Footer"
import * as Screens from "app/screens"
import { useStores } from "app/models"
import { AppRoute } from "./appRoutes"

const tabRoutes = [
  {
    name: AppRoute.HOME,
    title: "Trang chủ",
    icon: (props) => <Icon {...props} pack="app" name="home" width={16} height={16} />,
    screen: Screens.HomeScreen,
  },
  {
    name: AppRoute.APPOINTMENT_LIST,
    title: "Lịch hẹn",
    icon: (props) => <Icon {...props} pack="app" name="event" width={16} height={16} />,
    screen: Screens.HomeScreen,
    isAuth: true,
  },
  {
    name: AppRoute.QUESTION_LIST,
    title: "Hỏi đáp",
    icon: (props) => <Icon {...props} pack="app" name="help" width={16} height={16} />,
    screen: Screens.HomeScreen,
    isAuth: true,
  },
  {
    name: AppRoute.PROFILE,
    title: "Hồ sơ",
    icon: (props) => <Icon {...props} pack="app" name="doctor" width={16} height={16} />,
    screen: Screens.ProfileScreen,
    isAuth: true,
  },
]

interface TabBarProps extends BottomTabBarProps {}

const TabBar = observer(function TabBar(props: TabBarProps) {
  const {
    authStore: { isAuthenticated },
  } = useStores()
  const { state, navigation } = props

  const onTabSelect = (tabIndex) => {
    const tab = tabRoutes[tabIndex]
    if (tab.isAuth && !isAuthenticated) {
      navigation.navigate(AppRoute.AUTH, { screen: AppRoute.LOGIN })
    } else {
      navigation.navigate(tab.name)
    }
  }

  const renderTab = (tab) => (
    <BottomNavigationTab key={tab.name} icon={tab.icon} title={tab.title} />
  )

  return (
    <Footer>
      <Divider />
      <BottomNavigation indicatorStyle={tw.hPx} selectedIndex={state.index} onSelect={onTabSelect}>
        {tabRoutes.map(renderTab)}
      </BottomNavigation>
    </Footer>
  )
})

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      {tabRoutes.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarLabel: tab.title,
            tabBarIcon: tab.icon,
          }}
          component={tab.screen}
        />
      ))}
    </Tab.Navigator>
  )
}
