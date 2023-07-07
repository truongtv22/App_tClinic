import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as Yup from "yup"
import "yup-phone-lite"
import { tw } from "react-native-tailwindcss"
import { Formik, FormikProps } from "formik"
import { View } from "react-native"
import { Text, Button } from "@ui-kitten/components"
import OTPTextInput from "react-native-otp-textinput"

import Toast from "app/utils/toast"
import Avatar from "app/components/Avatar/Avatar"
import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"

import { AppRoute, AuthStackScreenProps } from "app/navigators"
import { Column } from "app/components/Stack"

interface VerifySmsScreenProps extends AuthStackScreenProps<AppRoute.VERIFY_SMS> {}

export const VerifySmsScreen: FC<VerifySmsScreenProps> = observer(function VerifySmsScreen() {
  return (
    <Container>
      <Header title="Xác nhận mã OTP" />
      <Content level="1" contentContainerStyle={tw.p4}>
        <Column space="8">
          <Column align="center">
            <Text category="p2">Mã xác nhận OTP đã được gửi vào số điện thoại của bạn.</Text>
            <Text category="p2">Vui lòng nhập mã xác nhận vào phía dưới.</Text>
          </Column>
          <Column space="4">
            <OTPTextInput inputCount={6} />
            <Button onPress={() => {}}>XÁC NHẬN</Button>
          </Column>
        </Column>
      </Content>
    </Container>
  )
})
