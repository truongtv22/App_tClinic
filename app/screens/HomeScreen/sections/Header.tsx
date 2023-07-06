import React from "react"
import { Text } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View } from "react-native"
import { tw } from "react-native-tailwindcss"

import makeStyles from "app/utils/makeStyles"

const useStyles = makeStyles({
  container: { flexDirection: "row", marginTop: 20, paddingHorizontal: 15 },
  appTitle: { fontWeight: "bold", fontSize: 24, color: "white" },
  appInfo: { color: "white" },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 9999,
  },
})

export default function Header() {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <View style={tw.flex1}>
        <Text style={styles.appTitle}>tClinic</Text>
        <Text style={styles.appInfo}>App đặt lịch phòng khám</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Ionicons name="search" size={18} onPress={() => {}} />
      </TouchableOpacity>
    </View>
  )
}
