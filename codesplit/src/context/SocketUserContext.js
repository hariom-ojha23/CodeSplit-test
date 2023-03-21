import React, { createContext, useRef } from 'react'

export const SocketUserContext = createContext()

const SocketUserProvider = ({ children }) => {
  let socketUserRef = useRef(null)

  const setSocketUserRef = (ref) => {
    socketUserRef.current = ref
  }

  return (
    <SocketUserContext.Provider value={{ socketUserRef, setSocketUserRef }}>
      {children}
    </SocketUserContext.Provider>
  )
}

export default SocketUserProvider
