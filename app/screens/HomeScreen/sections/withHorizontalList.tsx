import React from "react"
import PropTypes from "prop-types"
import { Text } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, View } from "react-native"
import appTheme from "app/theme/appTheme"

export function withHorizontalList(ListItem, data, title) {
  return function HorizontalList() {
    return (
      <View style={{ marginTop: 15 }}>
        {title ? (
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
        ) : null}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 5 }}>
          {data.map((e) => (
            <ListItem key={e.id} {...e} />
          ))}
          <View style={{ paddingRight: 15 }} />
        </ScrollView>
      </View>
    )
  }
}

withHorizontalList.propTypes = {
  ListItem: PropTypes.element,
  data: PropTypes.array,
  title: PropTypes.string,
}
