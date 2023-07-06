import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button } from "@ui-kitten/components"
import { View, Dimensions } from "react-native"
import tw from "app/theme/tailwind"
import { useStores } from "app/models"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import { AppRoute, MainStackScreenProps } from "app/navigators"
import makeStyles from "app/utils/makeStyles"
import Header from "./sections/Header"
import Banner from "./sections/Banner"

interface HomeScreenProps extends MainStackScreenProps<AppRoute.HOME> {}

const { width: screenWidth } = Dimensions.get("screen")

const useStyles = makeStyles({
  headerContainer: {
    position: "absolute",
    width: screenWidth * 2,
    height: screenWidth * 2,
    bottom: 0,
    marginLeft: -(screenWidth / 2),
    borderRadius: screenWidth,
    backgroundColor: "color-primary-default",
  },
})

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const styles = useStyles()

  const { authStore } = useStores()

  return (
    <Container style={{ marginTop: 20 }}>
      <Content level="1" scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{ top: 0, position: "absolute", width: screenWidth * 2, height: 350 }}>
          <View style={styles.headerContainer} />
        </View>
        <Header />
        <Banner />
      </Content>
    </Container>
  )
})
