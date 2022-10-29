import React, { useState } from "react"
import { FlatList, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import { observer } from "mobx-react-lite"
import { RouteProp, useNavigation, useRoute, useTheme } from "@react-navigation/native"

import { RootStackParamList } from "../.."
import { StreamStore } from "./store"
import { MessageData } from "./data"
import { PostModule } from "../../modules/post"
import { StreamContext, useStreamContext } from "./context"
// import { StreamsScreenNavigationProp } from "../streams"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type StreamScreenRouteProp = RouteProp<RootStackParamList, "Stream">
type StreamsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Stream">

export const StreamScreen = observer(() => {
  const route = useRoute<StreamScreenRouteProp>()
  const [streamStore] = useState(() => new StreamStore(route.params.streamId))
  const headerHeight = useHeaderHeight()
  const { colors } = useTheme()

  return (
    <StreamContext.Provider value={streamStore}>
      <SafeAreaView style={styles.root}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={headerHeight}
        >
          <FlatList
            data={streamStore.messages}
            renderItem={({ item }) => <Message item={item} />}
            keyExtractor={(item) => item.id}
          />

          {streamStore.stream && (
            <View style={[styles.post, { backgroundColor: colors.background }]}>
              <PostModule streamStore={streamStore} />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StreamContext.Provider>
  )
})

const Message = ({ item }: { item: MessageData }) => {
  const streamStore = useStreamContext()
  const navigation = useNavigation<StreamsScreenNavigationProp>()

  // const renderItem = ({ item }: { item: StreamData }) => (

  const handleLongPress = (message: MessageData) => {
    streamStore.setMessage(message)
  }

  const handlePress = (message: MessageData) => {
    if (message.stream) {
      console.log("message", message)

      navigation.push("Stream", {
        streamId: message.stream.id,
      })
    }
    // streamStore.setMessage(message)
  }

  return (
    <View>
      <Pressable onLongPress={() => handleLongPress(item)} onPress={() => handlePress(item)}>
        <Text>{item.text}</Text>
      </Pressable>
    </View>
  )
  // )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  streams: { flexGrow: 1 },
  post: {},
})
