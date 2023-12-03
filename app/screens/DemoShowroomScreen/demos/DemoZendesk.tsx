/* eslint-disable react/jsx-key */
import { spacing } from "app/theme/spacing"
import React from "react"
import { ViewStyle } from "react-native/types"
import { Icon, Text } from "../../../components"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const $demoIconContainer: ViewStyle = {
  padding: spacing.xs,
}

export const DemoZendesk: Demo = {
  name: "Expo Zendesk",
  description:
    "Expo Zendesk SDK is a React Native wrapper around the Zendesk Support SDKs for Android and iOS.",
  data: [
    <DemoUseCase name="Zendesk" description="There are a few presets that are preconfigured.">
      <Text>Demo Zendesk</Text>

      <Icon icon="ladybug" containerStyle={$demoIconContainer} />
    </DemoUseCase>,
  ],
}
