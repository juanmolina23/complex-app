import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import Axios from "axios"
Axios.defaults.baseURL =
  process.env.BACKENDURL || "https://molina-complexapp-backend.netlify.app"

ReactDOM.render(<App />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
