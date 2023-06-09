import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-tooltip/dist/react-tooltip.css'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import EditorSettingsProvider from './context/editorSettings'
import ChatMessageProvider from './context/ChatMessages'
import SocketUserProvider from './context/SocketUserContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <EditorSettingsProvider>
      <SocketUserProvider>
        <ChatMessageProvider>
          <App />
        </ChatMessageProvider>
      </SocketUserProvider>
    </EditorSettingsProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
