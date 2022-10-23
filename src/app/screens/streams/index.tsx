import React from "react"
import { FlatList, SafeAreaView, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { useRootContext } from "../../../context"

export const StreamsScreen = observer(() => {
  const rootStore = useRootContext()

  const renderItem = ({ item }: { item: { id: string } }) => (
    <View>
      <Text>{item.id}</Text>
    </View>
  )

  return (
    <SafeAreaView>
      <FlatList data={rootStore.streamsStore.streams} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  )
})
