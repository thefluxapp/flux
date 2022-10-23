import { AppRegistry } from "react-native"
import { App } from "./src/app/index"
import { API_URL } from "@env"
import axios from "axios"

axios.defaults.baseURL = API_URL

AppRegistry.registerComponent("flux", () => App)
