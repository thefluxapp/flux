import React from "react"
import { Button, FlatList, SafeAreaView, View } from "react-native"
import { observer } from "mobx-react-lite"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

import { useRootContext } from "../../../context"
import { StreamData } from "./data"
import { RootStackParamList } from "../.."

type StreamsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Streams">

export const StreamsScreen = observer(() => {
  const navigation = useNavigation<StreamsScreenNavigationProp>()
  const rootStore = useRootContext()

  const renderItem = ({ item }: { item: StreamData }) => (
    <View>
      <Button
        title={item.text}
        onPress={() => {
          navigation.navigate("Stream", {
            streamId: item.id,
          })
        }}
      />
    </View>
  )

  return (
    <SafeAreaView>
      <FlatList data={rootStore.streamsStore.streams} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  )
})
