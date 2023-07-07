import React from "react"
import PropTypes from "prop-types"
import { Text } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, TouchableOpacity, View } from "react-native"
import appTheme from "app/theme/appTheme"

export function withList(ListItem, data, title) {
  return function List() {
    return (
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
            marginRight: 10,
            marginBottom: 5,
          }}
        >
          <Text style={{ flex: 1, fontSize: 20, fontWeight: "bold" }}>{title}</Text>
          <Ionicons name={"chevron-forward"} size={22} color={appTheme["color-primary-500"]} />
        </View>

        <ScrollView style={{ paddingHorizontal: 5 }}>
          {data.map((e) => (
            <ListItem key={e.id} {...e} />
          ))}
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text style={{ color: appTheme["color-primary-500"] }}>Xem thêm ...</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

withList.propTypes = {
  ListItem: PropTypes.element,
  data: PropTypes.array,
  title: PropTypes.string,
}
