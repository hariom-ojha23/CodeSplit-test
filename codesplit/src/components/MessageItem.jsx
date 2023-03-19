import React, { useContext } from 'react'
import { SocketUserContext } from '../context/SocketUserContext'

const MessageItem = (props) => {
  const { socketUserRef } = useContext(SocketUserContext)

  return (
    <div className='msg-item-container'>
      {props.id !== socketUserRef?.current?.id && (
        <p className='msg-sender-name'>{props.sender}</p>
      )}
      <div
        className={`msg-text-container ${
          props.id === socketUserRef?.current?.id ? 'my-msg' : 'not-my-msg'
        }`}
      >
        <p className='msg-text'>{props.message}</p>
      </div>
    </div>
  )
}

export default React.memo(MessageItem)
