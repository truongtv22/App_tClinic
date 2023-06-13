import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef } from "react"
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  SafeAreaView,
} from "react-native"
import { Text } from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import * as echarts from "echarts/core"
import { BarChart, LineChart } from "echarts/charts"
import {
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from "echarts/components"
import { SVGRenderer, SkiaChart } from "@wuba/react-native-echarts"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

echarts.use([
  SVGRenderer,
  BarChart,
  LineChart,
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
])

const E_HEIGHT = 400
const E_WIDTH = Dimensions.get("window").width

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const skiaRef = useRef<any>(null)

  useEffect(() => {
    const categories = (function () {
      let now = new Date()
      const res = []
      let len = 10
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""))
        now = new Date(+now - 2000)
      }
      return res
    })()
    const categories2 = (function () {
      const res = []
      let len = 10
      while (len--) {
        res.push(10 - len - 1)
      }
      return res
    })()
    const data = (function () {
      const res = []
      let len = 10
      while (len--) {
        res.push(Math.round(Math.random() * 1000))
      }
      return res
    })()
    const data2 = (function () {
      const res = []
      let len = 0
      while (len < 10) {
        res.push(+(Math.random() * 10 + 5).toFixed(1))
        len++
      }
      return res
    })()
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56",
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { show: false, readOnly: false },
          restore: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: categories,
        },
        {
          type: "category",
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "Price",
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: "value",
          scale: true,
          name: "Order",
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: "Dynamic Bar",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data,
        },
        {
          name: "Dynamic Line",
          type: "line",
          data: data2,
        },
      ],
    }
    let chart: any
    let inter
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "light", {
        renderer: "svg",
        width: E_WIDTH,
        height: E_HEIGHT,
      })
      chart.setOption(option)

      let count = 11
      inter = setInterval(function () {
        const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "")

        data.shift()
        data.push(Math.round(Math.random() * 1000))
        data2.shift()
        data2.push(+(Math.random() * 10 + 5).toFixed(1))

        categories.shift()
        categories.push(axisData)
        categories2.shift()
        categories2.push(count++)

        chart.setOption({
          xAxis: [
            {
              data: categories,
            },
            {
              data: categories2,
            },
          ],
          series: [
            {
              data,
            },
            {
              data: data2,
            },
          ],
        })
      }, 500)
    }
    return () => {
      chart?.dispose()
      clearInterval(inter)
    }
  }, [])

  return (
    <SafeAreaView style={$container}>
      <SkiaChart ref={skiaRef} />
    </SafeAreaView>
  )

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
