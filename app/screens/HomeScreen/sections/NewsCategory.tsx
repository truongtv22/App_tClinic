import React from "react"
import { Text } from "@ui-kitten/components"
import { TouchableOpacity, View } from "react-native"
import appTheme from "app/theme/appTheme"
import makeStyles from "app/utils/makeStyles"
import { withHorizontalList } from "./withHorizontalList"

const useStyles = makeStyles({
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

function NewsCategoryItem({ title }) {
  title = title || "title"
  const styles = useStyles()
  return (
    <TouchableOpacity
      style={[
        styles.shadow,
        {
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: 10,
          flex: 1,
          marginVertical: 10,
          marginLeft: 10,
          paddingVertical: 15,
          paddingHorizontal: 6,
          width: 90,
        },
      ]}
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
      ></View>
      <Text numberOfLines={2} style={{ textAlign: "center" }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

function NewsCategory(props) {
  const NewsCategoryList = withHorizontalList(
    NewsCategoryItem,
    DATA,
    "Danh mục tin tức",
  )
  return <NewsCategoryList />
}
export default NewsCategory

const DATA = [
  { id: 0, title: "Gói dịch vụ" },
  { id: 1, title: "Thông tin sức khỏe" },
  { id: 2, title: "Tim mạch" },
  { id: 3, title: "Sức khỏe tổng quát" },
  { id: 4, title: "Cận lâm sàng" },
]
