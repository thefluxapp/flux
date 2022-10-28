import React from "react"
import { Button, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

import { useRootContext } from "../../../context"
import { StreamData } from "./data"
import { RootStackParamList } from "../.."
import { PostModule } from "../../modules/post"

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.streams}>
          <FlatList data={rootStore.streamsStore.streams} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </View>

        <View style={styles.post}>
          <PostModule />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: { flex: 1 },
  streams: { flexGrow: 1 },
  post: { backgroundColor: "red" },
})
