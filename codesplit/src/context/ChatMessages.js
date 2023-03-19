import React, { createContext, useState } from 'react'

export const ChatMessageContext = createContext()

const ChatMessageProvider = ({ children }) => {
  const [messageList, setMessageList] = useState([])
  console.log(messageList)

  return (
    <ChatMessageContext.Provider value={{ messageList, setMessageList }}>
      {children}
    </ChatMessageContext.Provider>
  )
}

export default ChatMessageProvider
