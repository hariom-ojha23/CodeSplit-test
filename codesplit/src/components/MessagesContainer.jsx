import React, { useContext, useState, useEffect } from 'react'
import MessageItem from './MessageItem'
import { ChatMessageContext } from '../context/ChatMessages'
import Actions from '../utils/actions'
import { SocketUserContext } from '../context/SocketUserContext'

const MessagesContainer = (props) => {
  const [message, setMessage] = useState('')

  const { socketUserRef } = useContext(SocketUserContext)
  const { messageList } = useContext(ChatMessageContext)

  function onClickSend() {
    if (socketUserRef && socketUserRef.current) {
      socketUserRef.current.emit(Actions.SEND_MESSAGE, {
        roomId: props.roomId,
        message,
      })

      setMessage('')
    }
  }

  return (
    <div className='msg-container sidebar-content'>
      <h2 className='control-sidebar-title'>Messages</h2>
      <div className='msg-list-container'>
        {messageList.map((item, index) => (
          <MessageItem
            id={item.id}
            key={index}
            sender={item.sender}
            message={item.message}
          />
        ))}
        <div className='spacer'></div>
      </div>
      <div className='msg-typebox-container'>
        <textarea
          rows={1}
          className='msg-textfield text-field'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          placeholder='Type a new message'
          className='msg-send-btn btn'
          onClick={onClickSend}
        >
          <i className='fa-solid fa-paper-plane msg-send-icon'></i>
        </button>
      </div>
    </div>
  )
}

export default React.memo(MessagesContainer)
