import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1a1a1a",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      }}
    />
  </React.StrictMode>,
)
