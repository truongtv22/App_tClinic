import React from "react"
import PropTypes from "prop-types"
import { useNavigation } from "@react-navigation/native"
import { Icon, TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import renderNode from "app/utils/renderNode"

function Toolbar(props) {
  const { leftIcon, hideLeftIcon, onBackPress, ...restProps } = props

  const navigation = useNavigation()

  const _onBackPress = React.useCallback(() => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }, [])

  const renderIcon = React.useCallback(
    (iconProps) =>
      renderNode(
        Icon,
        leftIcon || { pack: "app", name: "arrow-left", width: 20, height: 20 },
        iconProps,
      ),
    [leftIcon],
  )

  const renderLeftAction = React.useCallback(
    () => <TopNavigationAction icon={renderIcon} onPress={_onBackPress} />,
    [],
  )

  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={!hideLeftIcon && renderLeftAction}
      {...restProps}
    />
  )
}

export default Toolbar
