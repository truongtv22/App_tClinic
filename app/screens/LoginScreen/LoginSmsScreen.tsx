import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as Yup from "yup"
import "yup-phone-lite"
import { tw } from "react-native-tailwindcss"
import { Formik, FormikProps } from "formik"
import { View } from "react-native"
import { Text, Button } from "@ui-kitten/components"

import Toast from "app/utils/toast"
import Avatar from "app/components/Avatar/Avatar"
import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import FormikInput from "app/components/FormInput/FormikInput"

import { AppRoute, AuthStackScreenProps } from "app/navigators"

interface LoginSmsValues {
  phone: string
}

const loginSmsSchema = Yup.object({
  phone: Yup.string()
    .label("Số điện thoại")
    .required("${label} không được để trống")
    .phone("VN", "${label} không đúng định dạng"),
})

interface LoginSmsScreenProps extends AuthStackScreenProps<AppRoute.LOGIN_SMS> {}

export const LoginSmsScreen: FC<LoginSmsScreenProps> = observer(function LoginSmsScreen({
  navigation,
}) {
  const initialValues: LoginSmsValues = {
    phone: "",
  }

  const onFormSubmit = (values: LoginSmsValues) => {
    navigation.navigate(AppRoute.VERIFY_SMS)
  }

  const renderForm = (formik: FormikProps<LoginSmsValues>) => (
    <View style={[tw.flex1, tw.justifyBetween]}>
      <FormikInput
        name="phone"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <Button onPress={formik.submitForm}>TIẾP TỤC</Button>
    </View>
  )

  return (
    <Container>
      <Header />
      <Content level="1" contentContainerStyle={tw.p4}>
        <View style={[tw.pB10, tw.itemsCenter]}>
          <Avatar size="giant" icon={{ pack: "font-awesome5", name: "sms" }} status="primary" />
          <View style={tw.h6} />
          <Text category="h2">Đăng nhập SMS</Text>
          <View style={tw.h1} />
          <Text category="p2">Vui lòng nhập số điện thoại để nhận mã xác thực được gửi đến.</Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          component={renderForm}
          validationSchema={loginSmsSchema}
        />
      </Content>
    </Container>
  )
})
