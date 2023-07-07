import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { Formik } from "formik"
import { TouchableOpacity, View } from "react-native"
import { Text, Button } from "@ui-kitten/components"

import Toast from "app/utils/toast"
import Modal from "app/components/Modal/Modal"
import Avatar from "app/components/Avatar/Avatar"
import Header from "app/components/Header/Header"
import Content from "app/components/Content/Content"
import Container from "app/components/Container/Container"
import FormikInput from "app/components/FormInput/FormikInput"
import FormikSelect from "app/components/FormSelect/FormikSelect"
// import FormDatePicker from "app/components/FormDatePicker/FormDatePicker"

import { AppRoute } from "app/navigators"

interface ProfileEditScreenProps extends MainStackScreenProps<AppRoute.PROFILE_EDIT> {}

export const ProfileEditScreen: FC<ProfileEditScreenProps> = observer(function ProfileEditScreen() {
  const user = {}
  const initialValues = {
    birthday: user.birthday,
    email: user.email,
    full_name: user.full_name,
    gender: user.gender,
    phone: user.phone,
  }

  const modalRef = React.useRef()

  const closeModal = () => {
    modalRef.current?.hide()
  }

  const onFormSubmit = (values) => {
    modalRef.current?.show()
    // Toast.showText("Chức năng đang phát triển")
  }

  const onAvatarChange = () => {
    Toast.showText("Chức năng đang phát triển")
  }

  const renderForm = React.useCallback(
    (formik) => (
      <View style={[tw.flex1, tw.justifyBetween]}>
        <View>
          <FormikInput
            name="full_name"
            label="Họ và tên"
            variant="outlined"
            required={true}
            placeholder="Nhập họ và tên"
          />
          <FormikInput
            name="phone"
            label="Số điện thoại"
            variant="outlined"
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            autoCapitalize="none"
            containerStyle={tw.mT3}
          />
          <FormikInput
            name="email"
            label="Email"
            variant="outlined"
            required={true}
            placeholder="Email"
            containerStyle={tw.mT3}
          />
          <FormikSelect
            name="gender"
            label="Giới tính"
            variant="outlined"
            placeholder="Giới tính"
            options={[
              { value: 1, label: "Nam" },
              { value: 2, label: "Nữ" },
            ]}
            containerStyle={tw.mT3}
            onChange={(e) => formik.setFieldValue("gender", e.value)}
          />
          {/* <FormDatePicker
            name="birthday"
            value={formik.values.birthday}
            label="Ngày sinh"
            variant="outlined"
            onChange={(e) => formik.setFieldValue("birthday", new Date(e))}
          /> */}
          <View style={tw.h2} />
        </View>
        <Button onPress={formik.handleSubmit}>CẬP NHẬT</Button>
      </View>
    ),
    [],
  )

  return (
    <Container>
      <Header title="Chỉnh sửa cá nhân" />
      <Content keyboardEnabled contentContainerStyle={tw.p4}>
        <View style={[tw.itemsCenter, tw.justifyCenter]}>
          <TouchableOpacity onPress={onAvatarChange}>
            <Avatar style={[tw.w24, tw.h24]} title="Ng" status="primary" />
            <Avatar
              icon={{ name: "camera" }}
              size="small"
              style={[tw.absolute, { right: -10, bottom: -10 }]}
              onPress={onAvatarChange}
            />
          </TouchableOpacity>
        </View>
        <View style={tw.h4} />
        <Formik initialValues={initialValues} onSubmit={onFormSubmit} component={renderForm} />
      </Content>
      <Modal ref={modalRef} onBackdropPress={closeModal}>
        <Container style={[tw.p6, tw.rounded]}>
          <View style={tw.itemsCenter}>
            <Avatar icon={{ name: "checkmark" }} style={[tw.w20, tw.h20]} status="success" />
          </View>
          <View style={tw.h6} />
          <View style={tw.itemsCenter}>
            <Text category="h4">Thành công</Text>
            <View style={tw.h1} />
            <Text appearance="hint">Chỉnh sửa thành công</Text>
          </View>
        </Container>
      </Modal>
    </Container>
  )
})
