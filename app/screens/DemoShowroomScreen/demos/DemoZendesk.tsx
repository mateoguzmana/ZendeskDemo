import { colors } from "app/theme"
import { spacing } from "app/theme/spacing"
import { useZendesk } from "react-native-zendesk-unified"
import React, { FC, useCallback, useEffect } from "react"
import { ViewStyle, TextStyle, Pressable, View, Alert } from "react-native"
import { Icon, IconTypes, Text } from "../../../components"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const $centeredText: TextStyle = {
  textAlign: "center",
}

const $iconTile: ViewStyle = {
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
  borderRadius: 5,
  paddingVertical: spacing.xs,
  marginHorizontal: spacing.xs,
}

const $iconTileLabel: TextStyle = {
  marginTop: spacing.xxs,
  color: colors.textDim,
  textAlign: "center",
  flexWrap: "wrap",
  flex: 1,
}

const $customIconContainer: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.xs,
}

const $row: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  paddingHorizontal: spacing.sm,
}

interface IconTileProps {
  icon: IconTypes
  label: string
  onPress(): void
}

const IconTile: FC<IconTileProps> = ({ icon, label, onPress }) => (
  <View style={$customIconContainer}>
    <Pressable style={$iconTile} onPress={onPress}>
      <Icon icon={icon} color={colors.tint} size={35} />

      <Text size="xs" style={$iconTileLabel}>
        {label}
      </Text>
    </Pressable>
  </View>
)

const Row: FC<React.PropsWithChildren> = ({ children }) => <View style={$row}>{children}</View>

const SupportSDKDemo: FC = () => {
  const zendesk = useZendesk()

  const [healthCheck, setHealthCheck] = React.useState<string | undefined>()

  const loadHealthCheck = useCallback(async () => {
    try {
      const healthCheckResult = await zendesk.healthCheck()

      setHealthCheck(healthCheckResult)
    } catch (error) {
      if (error instanceof Error) {
        setHealthCheck(error.message)
      }
    }
  }, [zendesk])

  const openHelpCenter = async () => {
    try {
      await zendesk.openHelpCenter({
        labels: ["test"],
        groupType: "section",
        groupIds: [15138052595485],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const openTicket = async () => {
    try {
      await zendesk?.openTicket("28")
    } catch (error) {
      console.log(error)
    }
  }

  const openNewTicket = async () => {
    try {
      await zendesk.openNewTicket({
        subject: "How does the app work?",
        tags: ["app", "test"],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const listTickets = async () => {
    try {
      await zendesk.listTickets()
    } catch (error) {
      console.log(error)
    }
  }

  const openArticle = async () => {
    try {
      await zendesk.openArticle(15138112850333)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadHealthCheck()
    zendesk.changeTheme("#FF0000")
    zendesk.setAnonymousIdentity({
      email: "testing6@mail.com",
      name: "Mateo Guzmán",
    })
    zendesk.setHelpCenterLocaleOverride("nl")
  }, [])

  return (
    <>
      <Text style={$centeredText}>🛠️ {healthCheck}</Text>

      <Row>
        <IconTile icon="ladybug" label="Open Help Center" onPress={openHelpCenter} />

        <IconTile icon="check" label="Open Ticket" onPress={openTicket} />

        <IconTile icon="x" label="Open New Ticket" onPress={openNewTicket} />
      </Row>

      <Row>
        <IconTile icon="menu" label="List Tickets" onPress={listTickets} />

        <IconTile icon="more" label="Open Article" onPress={openArticle} />
      </Row>
    </>
  )
}

const ChatSDKDemo: FC = () => {
  const openChat = async () => {
    Alert.alert("Open Chat")
  }

  return (
    <Row>
      <IconTile icon="menu" label="Open Chat" onPress={openChat} />
    </Row>
  )
}

export const DemoZendesk: Demo = {
  name: "Expo Zendesk",
  description:
    "Expo Zendesk is a React Native wrapper around the Zendesk SDKs for Android and iOS.",
  data: [
    <DemoUseCase
      name="Support SDK"
      description="Here are some examples of using Zendesk Support SDK"
    >
      <SupportSDKDemo />
    </DemoUseCase>,
    <DemoUseCase name="Chat SDK" description="Coming soon!">
      <ChatSDKDemo />
    </DemoUseCase>,
  ],
}
