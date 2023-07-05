import React, { FC, useMemo, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { Formik } from "formik"
import { View, Image } from "react-native"
import { Text, Button } from "@ui-kitten/components"

import { ImageAssets } from "app/constants/assets"

import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import FormikInput from "app/components/FormInput/FormikInput"

import { AppRoute, AuthStackScreenProps } from "app/navigators"

interface RegisterScreenProps extends AuthStackScreenProps<AppRoute.REGISTER> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const initialForm = useMemo(
    () => ({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      telephone: "",
    }),
    [],
  )

  const onFormSubmit = useCallback((values) => {}, [])

  const renderForm = useCallback(
    (formik) => (
      <View style={[tw.flex1, tw.justifyBetween]}>
        <View>
          <FormikInput name="name" label="Họ và tên" required={true} placeholder="Nhập họ và tên" />
          <FormikInput
            name="email"
            label="Email"
            required={true}
            placeholder="Nhập email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={tw.mT3}
          />
          <FormikInput
            name="password"
            label="Mật khẩu"
            required={true}
            placeholder="Nhập mật khẩu"
            autoCapitalize="none"
            containerStyle={tw.mT3}
            secureTextEntry={true}
          />
          <FormikInput
            name="passwordConfirm"
            label="Xác nhận mật khẩu"
            required={true}
            placeholder="Nhập lại mật khẩu"
            autoCapitalize="none"
            containerStyle={tw.mT3}
            secureTextEntry={true}
          />
          <FormikInput
            name="telephone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            autoCapitalize="none"
            containerStyle={tw.mT3}
          />
          <View style={tw.h2} />
        </View>
        <Button onPress={formik.handleSubmit}>ĐĂNG KÝ</Button>
      </View>
    ),
    [],
  )

  return (
    <Container>
      <Header />
      <Content level="1" keyboardEnabled contentContainerStyle={tw.p4}>
        <View style={[tw.pB10, tw.itemsCenter]}>
          <Image source={ImageAssets.LOGO} />
          <View style={tw.h6} />
          <Text category="h1">Đăng ký</Text>
          <View style={tw.h1} />
          <Text category="c1">Nhập thông tin đăng nhập của bạn để tiếp tục</Text>
        </View>
        <Formik
          initialValues={initialForm}
          onSubmit={onFormSubmit}
          component={renderForm}
          // validationSchema={RegisterSchema}
        />
      </Content>
    </Container>
  )
})
