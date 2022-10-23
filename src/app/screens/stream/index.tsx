import React, { useState } from "react"
import { FlatList, SafeAreaView, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { RouteProp, useRoute } from "@react-navigation/native"

import { RootStackParamList } from "../.."
import { StreamStore } from "./store"
import { MessageData } from "./data"

// type Props = NativeStackScreenProps<RootStackParamList, "Stream">
type StreamScreenRouteProp = RouteProp<RootStackParamList, "Stream">

export const StreamScreen = observer(() => {
  const route = useRoute<StreamScreenRouteProp>()
  const [streamStore] = useState(() => new StreamStore(route.params.streamId))

  console.log("route.params.streamId", route.params.streamId)

  const renderItem = ({ item }: { item: MessageData }) => (
    <View>
      <Text>{item.text}</Text>
    </View>
  )

  return (
    <SafeAreaView>
      <FlatList data={streamStore.messages} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  )
})
