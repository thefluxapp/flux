import React from "react"
import { Button, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
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
  const headerHeight = useHeaderHeight()
  // const { colors } = useTheme()

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
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          style={styles.streams}
          data={rootStore.streamsStore.streams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  streams: { flexGrow: 1 },
})
