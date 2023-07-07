import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Formik, FormikProps } from "formik"
import { Image } from "react-native"
import { Text, Button } from "@ui-kitten/components"
import * as Yup from "yup"
import "yup-phone-lite"

import tw from "app/theme/tailwind"
import { ImageAssets } from "app/constants/assets"

import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import FormikInput from "app/components/FormInput/FormikInput"
import { Column } from "app/components/Stack"

import { AppRoute, AuthStackScreenProps } from "app/navigators"

interface RegisterValues {
  name: string
  email: string
  password: string
  passwordConfirm: string
  phone: string
}

const registerSchema = Yup.object({
  name: Yup.string()
    .label("Họ và tên")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
  email: Yup.string()
    .label("Email")
    .required("${label} không được để trống")
    .email("${label} không đúng định dạng"),
  password: Yup.string()
    .label("Mật khẩu")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
  passwordConfirm: Yup.string()
    .label("Xác nhận mật khẩu")
    .required("${label} không được để trống")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
  phone: Yup.string().label("Số điện thoại").phone("VN", "${label} không đúng định dạng"),
})

interface RegisterScreenProps extends AuthStackScreenProps<AppRoute.REGISTER> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const initialValues = useMemo<RegisterValues>(
    () => ({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    }),
    [],
  )

  const onFormSubmit = (values: RegisterValues) => {}

  const renderForm = (formik: FormikProps<RegisterValues>) => (
    <Column style={tw.style("flex-1 justify-between")}>
      <Column space="2">
        <FormikInput name="name" label="Họ và tên" required placeholder="Nhập họ và tên" />
        <FormikInput
          name="email"
          label="Email"
          required
          placeholder="Nhập email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormikInput
          name="password"
          label="Mật khẩu"
          required
          placeholder="Nhập mật khẩu"
          autoCapitalize="none"
          secureTextEntry
        />
        <FormikInput
          name="passwordConfirm"
          label="Xác nhận mật khẩu"
          required
          placeholder="Nhập lại mật khẩu"
          autoCapitalize="none"
          secureTextEntry
        />
        <FormikInput
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </Column>
      <Button onPress={formik.submitForm}>ĐĂNG KÝ</Button>
    </Column>
  )

  return (
    <Container>
      <Header />
      <Content level="1" keyboardEnabled>
        <Column space="6" style={tw.style("flex-1 p-4")}>
          <Column space="6" align="center">
            <Image source={ImageAssets.LOGO} />
            <Column space="1" align="center">
              <Text category="h1">Đăng ký</Text>
              <Text category="p2">Nhập thông tin đăng nhập của bạn để tiếp tục</Text>
            </Column>
          </Column>
          <Formik
            initialValues={initialValues}
            onSubmit={onFormSubmit}
            component={renderForm}
            validationSchema={registerSchema}
          />
        </Column>
      </Content>
    </Container>
  )
})
