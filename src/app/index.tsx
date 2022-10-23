import React from "react"
import { observer } from "mobx-react-lite"
import { API_URL } from "@env"
import axios from "axios"
import { NavigationContainer } from "@react-navigation/native"

import { useRootContext } from "../context"
import { MainScreen } from "./screens/main"

axios.defaults.baseURL = API_URL

export const App = observer(() => {
  const rootStore = useRootContext()

  // const isDarkMode = useColorScheme() === 'dark';

  if (!rootStore.isInitialized) return null

  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  )
})
