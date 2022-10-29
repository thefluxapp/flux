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
      <View style={styles.root}>
        <View style={styles.text}>
          <TextInput
            multiline
            onChangeText={setText}
            value={text}
            style={[styles.input, { borderColor: colors.border }]}
          />
        </View>

        <Button onPress={handleSubmit} title="Send" />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 12 },
  text: { flex: 1 },
  input: { backgroundColor: "white", borderWidth: 1, borderRadius: 4, fontSize: 14, lineHeight: 18, padding: 4 },
})
