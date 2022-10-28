import React, { useState } from "react"
import { TextInput, View } from "react-native"

export const PostModule = () => {
  const [text, onChangeText] = useState("Useless Text")

  return (
    <View>
      <TextInput onChangeText={onChangeText} value={text} />
    </View>
  )
}
