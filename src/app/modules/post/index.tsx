import { useTheme } from "@react-navigation/native"
import axios from "axios"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"

import { useRootContext } from "../../../context"
import { StreamStore } from "../../screens/stream/store"

export const PostModule = observer(({ streamStore }: { streamStore: StreamStore }) => {
  const { authStore } = useRootContext()
  const [text, setText] = useState("")
  const { colors } = useTheme()

  const { stream, message } = streamStore

  const handleSubmit = async () => {
    const { data } = await axios.post(
      "/messages",
      { text, ...(message && { message_id: message.id }), ...(!message && stream && { stream_id: stream.id }) },
      { headers: { authorization: `Bearer ${authStore.jwt}` } }
    )

    console.log(data)
  }

  return (
    <View>
      {message && (
        <View>
          <Text>{message.text}</Text>
        </View>
      )}
      <View style={[styles.root]}>
        <View style={[styles.text, { backgroundColor: colors.border }]}>
          <TextInput multiline onChangeText={setText} value={text} style={[styles.input, { color: colors.text }]} />
        </View>

        <Button onPress={handleSubmit} title="Send" />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  text: { flex: 1, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 4 },
  input: { fontSize: 14, lineHeight: 20, paddingVertical: 8, paddingHorizontal: 8 },
})
