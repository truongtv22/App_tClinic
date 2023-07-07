import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as Yup from "yup"
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

interface ForgetPassValues {
  email: string
}

const forgetPassSchema = Yup.object({
  email: Yup.string()
    .label("Email")
    .required("${label} không được để trống")
    .email("${label} không đúng định dạng"),
})

interface ForgetPassScreenProps extends AuthStackScreenProps<AppRoute.FORGET_PASS> {}

export const ForgetPassScreen: FC<ForgetPassScreenProps> = observer(function ForgetPassScreen() {
  const initialValues: ForgetPassValues = {
    email: "",
  }

  const onFormSubmit = (values: ForgetPassValues) => {
    Toast.showText("Chức năng đang phát triển")
  }

  const renderForm = (formik: FormikProps<ForgetPassValues>) => (
    <View style={[tw.flex1, tw.justifyBetween]}>
      <FormikInput
        name="email"
        label="Email"
        placeholder="Nhập email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button onPress={formik.submitForm}>HOÀN THÀNH</Button>
    </View>
  )

  return (
    <Container>
      <Header />
      <Content level="1" contentContainerStyle={tw.p4}>
        <View style={[tw.pB10, tw.itemsCenter]}>
          <Avatar size="giant" icon={{ name: "lock" }} status="primary" />
          <View style={tw.h6} />
          <Text category="h2">Khôi phục mật khẩu</Text>
          <View style={tw.h1} />
          <Text category="p2">Vui lòng nhập địa chỉ email của bạn.</Text>
          <Text category="p2">Kiểm tra lại hộp thư email sau khi hoàn thành.</Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          component={renderForm}
          validationSchema={forgetPassSchema}
        />
      </Content>
    </Container>
  )
})
