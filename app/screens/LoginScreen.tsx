import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
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
import { Screen, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  const { height: heightScreen } = useWindowDimensions()

  const [passwordSecure, setPasswordSecure] = useState(true)

  const initialForm = {
    username: "admin", // '0911079127',
    password: "admin@123", // 'abc@123',
  }

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const onPasswordPress = useMemoizedFn(() => {
    setPasswordSecure(!passwordSecure)
  })

  const onFormSubmit = useMemoizedFn((values) => {
    console.log("onFormSubmit", values)
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

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

// @demo remove-file
