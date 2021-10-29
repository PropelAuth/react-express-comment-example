import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { AuthProvider } from "@propelauth/react"

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider authUrl="REPLACE_ME">
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
