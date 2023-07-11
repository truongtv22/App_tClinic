import React from "react"
import PropTypes from "prop-types"
import { useNavigation } from "@react-navigation/native"
import { Icon, TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import renderNode from "app/utils/renderNode"

export const BackNavAction = (props) => {
  const { icon, onPress, ...restProps } = props

  const navigation = useNavigation()

  const _onPress = React.useCallback(() => {
    if (onPress) {
      onPress()
    } else {
      navigation.goBack()
    }
  }, [])

  const renderIcon = React.useCallback(
    (iconProps) =>
      renderNode(
        Icon,
        icon || { pack: "app", name: "arrow-left", width: 20, height: 20 },
        iconProps,
      ),
    [icon],
  )

  return <TopNavigationAction {...restProps} icon={renderIcon} onPress={_onPress} />
}

function Toolbar(props) {
  const { leftIcon, hideLeftIcon, onBackPress, ...restProps } = props

  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={!hideLeftIcon && <BackNavAction icon={leftIcon} onPress={onBackPress} />}
      {...restProps}
    />
  )
}

export default Toolbar
