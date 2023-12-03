/* eslint-disable react/jsx-key */
import { colors } from "app/theme"
import { spacing } from "app/theme/spacing"
import { useExpoZendesk } from "expo-zendesk"
import React, { FC, useEffect } from "react"
import { ViewStyle, TextStyle, Pressable, View } from "react-native"
import { Icon, Text } from "../../../components"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const $iconTile: ViewStyle = {
  width: "33.333%",
  alignItems: "center",
  paddingVertical: spacing.xs,
  borderWidth: 1,
}

const $iconTileLabel: TextStyle = {
  marginTop: spacing.xxs,
  color: colors.textDim,
  textAlign: "center",
}

const $customIconContainer: ViewStyle = {
  paddingVertical: spacing.md,
}

const ZendeskContainer: FC = () => {
  const expoZendesk = useExpoZendesk()

  const openHelpCenter = () => {
    expoZendesk.openHelpCenter({
      labels: ["test"],
      groupType: "section",
      groupIds: [15138052595485],
    })
  }

  useEffect(() => {
    expoZendesk.changeTheme("#3f2b96")
    expoZendesk.setAnonymousIdentity({
      email: "testing6@mail.com",
      name: "Mateo Guzmán",
    })
    expoZendesk.setHelpCenterLocaleOverride("nl")
  }, [])

  return (
    <DemoUseCase name="Zendesk" description="There are a few presets that are preconfigured.">
      <Text>Demo Zendesk</Text>

      <Text>{expoZendesk.healthCheck()}</Text>

      <View style={$customIconContainer}>
        <Pressable style={$iconTile} onPress={openHelpCenter}>
          <Icon icon="ladybug" color={colors.tint} size={35} />

          <Text size="xs" style={$iconTileLabel}>
            Open Help Center
          </Text>
        </Pressable>
      </View>
    </DemoUseCase>
  )
}

export const DemoZendesk: Demo = {
  name: "Expo Zendesk",
  description:
    "Expo Zendesk is a React Native wrapper around the Zendesk SDKs for Android and iOS.",
  data: [<ZendeskContainer />],
}
