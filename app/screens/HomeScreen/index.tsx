import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button } from "@ui-kitten/components"
import tw from "app/theme/tailwind"
import { useStores } from "app/models"
import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import { AppRoute, MainStackScreenProps } from "app/navigators"

interface HomeScreenProps extends MainStackScreenProps<AppRoute.HOME> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { authStore } = useStores()

  return (
    <Container>
      <Header title="Trang chủ" hideLeftIcon />
      <Content style={tw.style("p-4")}>
        <Button onPress={() => authStore.logout()}>Logout</Button>
      </Content>
    </Container>
  )
})
