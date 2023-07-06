import React, { useRef, useState } from "react"
import { View, ScrollView, Dimensions } from "react-native"
import makeStyles from "app/utils/makeStyles"
import appTheme from "app/theme/appTheme"

const dataBanner = [
  {
    id: 1,
    color: "tomato",
  },
  {
    id: 2,
    color: "lavender",
  },
  {
    id: 3,
    color: "pink",
  },
  {
    id: 4,
    color: "orange",
  },
  {
    id: 5,
    color: "olive",
  },
]

const SCREEN_WIDTH = Dimensions.get("window").width

const useStyles = makeStyles({
  bannerContainer: {
    width: SCREEN_WIDTH,
  },
  bannerContentContainer: {
    margin: 15,
    height: 144,
    borderRadius: 6,
  },
  dotWrap: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    marginBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
    margin: 3,
  },
})

export default function Banner() {
  const [index, setIndex] = useState(0)
  const scrollRef = useRef()
  const styles = useStyles()

  const handleScroll = (event) => {
    setIndex(Math.floor((event.nativeEvent.contentOffset.x + SCREEN_WIDTH / 2) / SCREEN_WIDTH))
  }

  const scrollBack = () => {
    index === 0
      ? scrollRef.current.scrollTo({ x: SCREEN_WIDTH * (dataBanner.length - 1), animated: true })
      : scrollRef.current.scrollTo({ x: SCREEN_WIDTH * (index - 1), animated: true })
  }

  const scrollNext = () => {
    index === dataBanner.length - 1
      ? scrollRef.current.scrollTo({ x: 0, animated: true })
      : scrollRef.current.scrollTo({ x: SCREEN_WIDTH * (index + 1), animated: true })
  }

  const BannerItem = ({ id, color }) => {
    const styles = useStyles()
    return (
      <View style={styles.bannerContainer}>
        <View
          style={[styles.bannerContentContainer, { backgroundColor: appTheme["color-basic-100"] }]}
        />
      </View>
    )
  }

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {dataBanner.map((item) => (
          <BannerItem key={item.id} {...item} />
        ))}
      </ScrollView>

      <View style={styles.dotWrap}>
        {dataBanner.map((item, idx) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              { backgroundColor: idx === index ? appTheme["color-primary-400"] : "lightgray" },
            ]}
          />
        ))}
      </View>
    </View>
  )
}
