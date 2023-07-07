import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "@ui-kitten/components"
import { Dimensions, TouchableOpacity, View } from "react-native"
import appTheme from "app/theme/appTheme"
import makeStyles from "app/utils/makeStyles"

const useStyles = makeStyles({
  container: {
    marginHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

function MainMenuItem({ empty, title, icon }) {
  title = title || "menu"
  if (empty) return <View style={{ flex: 1, margin: 5 }} />

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        borderRadius: 10,
        flex: 1,
        margin: 5,
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 9999,
          backgroundColor: appTheme["color-primary-transparent-100"],
          marginBottom: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Ionicons name={'search'} size={22} color={appTheme['color-primary-500']} /> */}
      </View>
      <Text style={{ textAlign: "center", fontSize: 13 }}>{title}</Text>
    </TouchableOpacity>
  )
}

function MainMenu(props) {
  const styles = useStyles()
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={{ flexDirection: "row" }}>
        <MainMenuItem title="Lịch hẹn" />
        <MainMenuItem title="Hỏi đáp" />
        <MainMenuItem title="Tư vấn sức khỏe từ xa" />
        <MainMenuItem />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <MainMenuItem />
        <MainMenuItem />
        <MainMenuItem />
        <MainMenuItem empty />
      </View>
    </View>
  )
}
export default MainMenu
