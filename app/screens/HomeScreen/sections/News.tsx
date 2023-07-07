import React from "react"
import { Text } from "@ui-kitten/components"
import { TouchableOpacity, View } from "react-native"
import appTheme from "app/theme/appTheme"
import makeStyles from "app/utils/makeStyles"
import { withList } from "./withList"

function NewsItem({ title, content }) {
  content = content || ""
  return (
    <TouchableOpacity style={{ flexDirection: "row", marginBottom: 8, marginLeft: 10 }}>
      <View
        style={{
          width: 100,
          height: 70,
          backgroundColor: appTheme["color-primary-transparent-100"],
          borderRadius: 10,
        }}
      ></View>
      <Text numberOfLines={2} style={{ flex: 1, marginVertical: 15, marginHorizontal: 8 }}>
        {content}
      </Text>
    </TouchableOpacity>
  )
}

function News(props) {
  const NewsList = withList(NewsItem, DATA, "Tin tức mới nhất")
  return <NewsList />
}
export default News

const DATA = [
  { id: 0, content: "Các triệu chứng tiêu hóa thường gawkp ở trẻ rối loạn phổ tự kỷ" },
  { id: 1, content: "Cách nào giảm đau rát họng hiệu quả?" },
  { id: 2, content: "Hướng dẫn làm sách cho da nhạy cảm" },
]
