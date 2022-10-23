import React from "react"
import { observer } from "mobx-react-lite"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useRootContext } from "../context"
import { MainScreen } from "./screens/main"
import { StreamScreen } from "./screens/stream"

export const App = observer(() => {
  const rootStore = useRootContext()

  // const isDarkMode = useColorScheme() === 'dark';

  if (!rootStore.isInitialized) return null

  const RootStack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main" component={MainScreen} />
        <RootStack.Screen name="Stream" component={StreamScreen} />
      </RootStack.Navigator>
      <MainScreen />
    </NavigationContainer>
  )
})

export type RootStackParamList = {
  Streams: undefined
  Stream: { streamId: string }
}
