import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  View,
  Image,
  TextInput,
  TextStyle,
  ViewStyle,
  ImageBackground,
  useWindowDimensions,
} from "react-native"
import { Icon, Text, Button } from "@ui-kitten/components"
import { tw } from "react-native-tailwindcss"
import { Formik } from "formik"
import { useMemoizedFn } from "ahooks"

import { ImageAssets } from "app/constants/assets"
import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import FormikInput from "app/components/FormInput/FormikInput"
import { Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const { authStore } = useStores()

  const [passwordSecure, setPasswordSecure] = useState(true)

  const { height: heightScreen } = useWindowDimensions()

  const initialForm = {
    username: "admin", // '0911079127',
    password: "admin@123", // 'abc@123',
  }

  const onPasswordPress = useMemoizedFn(() => {
    setPasswordSecure(!passwordSecure)
  })

  const onFormSubmit = useMemoizedFn((values) => {
    authStore.login(values.username, values.password)
  })

  const renderForm = useMemoizedFn((formik) => (
    <View style={tw.pY6}>
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
        containerStyle={tw.mT3}
        secureTextEntry={passwordSecure}
      />
      {/* <View style={[tw.flexRow, tw.mT3, tw.itemsCenter, tw.justifyBetween]}>
          <CheckBox checked={shouldRemember} onChange={onRememberChange}>
            Nhớ mật khẩu
          </CheckBox>
          <TouchableOpacity onPress={navigateForgetPassword}>
            <Text category="s2">Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View> */}
      <Button style={tw.mT6} onPress={formik.handleSubmit}>
        ĐĂNG NHẬP
      </Button>
    </View>
  ))

  return (
    <Container>
      <Content level="1" safeAreaEnabled={false} keyboardEnabled={true}>
        <ImageBackground style={{ height: 0.35 * heightScreen }} source={ImageAssets.BG_DOCTOR}>
          <Header style={[tw.flex1, tw.itemsCenter, tw.justifyCenter, tw.bgTransparent]}>
            <Image source={ImageAssets.LOGO} />
          </Header>
        </ImageBackground>
        <Content
          level="1"
          style={{
            top: -8,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <View style={[tw.flex1, tw.p6]}>
            <Text category="h1">Đăng nhập</Text>
            <View style={tw.h2} />
            <Text category="p1">Đăng nhập hệ thống tClinic</Text>
            <Formik initialValues={initialForm} onSubmit={onFormSubmit} component={renderForm} />
          </View>
        </Content>
      </Content>
    </Container>
  )
})
