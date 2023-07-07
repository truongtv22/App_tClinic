import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, ImageBackground, useWindowDimensions } from "react-native"
import { Text, Button, CheckBox } from "@ui-kitten/components"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"

import tw from "app/theme/tailwind"

import { ImageAssets } from "app/constants/assets"
import { Column, Row } from "app/components/Stack"
import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import FormikInput from "app/components/FormInput/FormikInput"

import { AppRoute, AuthStackScreenProps } from "app/navigators"

import { useStores } from "app/models"

interface LoginValues {
  username: string
  password: string
}

const loginSchema = Yup.object({
  username: Yup.string().label("Tài khoản").required("${label} không được để trống"),
  password: Yup.string()
    .label("Mật khẩu")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
})

interface LoginScreenProps extends AuthStackScreenProps<AppRoute.LOGIN> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const { authStore } = useStores()

  const initialValues = useMemo<LoginValues>(
    () => ({
      username: "admin",
      password: "admin@123",
    }),
    [],
  )

  const [shouldRemember, setShouldRemember] = useState(true)
  const [passwordSecure, setPasswordSecure] = useState(true)

  const { height: heightScreen } = useWindowDimensions()

  const onFormSubmit = (values: LoginValues) => {
    authStore.login(values.username, values.password)
  }

  const onPasswordPress = () => {
    setPasswordSecure(!passwordSecure)
  }

  const onRememberChange = (checked: boolean) => {
    setShouldRemember(checked)
  }

  const navigateLoginSms = () => {
    navigation.navigate(AppRoute.LOGIN_SMS)
  }

  const navigateRegister = () => {
    navigation.navigate(AppRoute.REGISTER)
  }

  const navigateForgetPass = () => {
    navigation.navigate(AppRoute.FORGET_PASS)
  }

  const renderForm = (formik: FormikProps<LoginValues>) => (
    <Column space="6">
      <Column space="2">
        <FormikInput name="username" placeholder="Nhập tài khoản" autoCapitalize="none" />
        <FormikInput
          name="password"
          icon={{
            name: passwordSecure ? "eye" : "eye-close",
            pack: "app",
            width: 20,
            height: 20,
          }}
          onIconPress={onPasswordPress}
          placeholder="Nhập mật khẩu"
          autoCapitalize="none"
          secureTextEntry={passwordSecure}
        />
        <Row align="center" justify="space-between">
          <CheckBox checked={shouldRemember} onChange={onRememberChange}>
            Nhớ mật khẩu
          </CheckBox>
          <Row>
            <TouchableOpacity onPress={navigateForgetPass}>
              <Text category="s2" status="primary">
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
            <Text category="s2"> hoặc </Text>
            <TouchableOpacity onPress={navigateRegister}>
              <Text category="s2" status="primary">
                Đăng ký
              </Text>
            </TouchableOpacity>
          </Row>
        </Row>
      </Column>
      <Column space="2">
        <Button onPress={formik.submitForm}>ĐĂNG NHẬP</Button>
        <TouchableOpacity style={tw.style("self-center")} onPress={navigateLoginSms}>
          <Text category="s2" status="primary">
            Đăng nhập qua sms
          </Text>
        </TouchableOpacity>
      </Column>
    </Column>
  )

  return (
    <Container>
      <Content level="1" keyboardEnabled safeAreaEnabled={false}>
        <ImageBackground style={{ height: 0.35 * heightScreen }} source={ImageAssets.BG_DOCTOR}>
          <Header style={tw.style("flex-1 items-center justify-center bg-transparent")}>
            <Image source={ImageAssets.LOGO} />
          </Header>
        </ImageBackground>
        <Content level="1" style={tw.style("-mt-2 rounded-t-2xl")}>
          <Column space="6" style={tw.style("flex-1 p-6")}>
            <Column space="2">
              <Text category="h1">Đăng nhập</Text>
              <Text category="p1">Đăng nhập hệ thống tClinic</Text>
            </Column>
            <Formik
              initialValues={initialValues}
              onSubmit={onFormSubmit}
              component={renderForm}
              validationSchema={loginSchema}
            />
          </Column>
        </Content>
      </Content>
    </Container>
  )
})
