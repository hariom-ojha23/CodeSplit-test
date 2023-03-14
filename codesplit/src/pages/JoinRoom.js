import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const JoinRoom = () => {
  const [roomId, setRoomId] = useState('')
  const [username, setUserName] = useState('')

  const navigate = useNavigate()

  function onClickNewRoom() {
    setRoomId(uuid())
    toast.success('New room created')
  }

  function joinRoom() {
    const isOk = validateData()

    if (isOk) {
      navigate(`/editor/${roomId}`, { state: { username } })
    }
  }

  function validateData() {
    if (!roomId || !username) {
      toast.error('Room Id and Username is required')
      return false
    }

    return true
  }

  function handleKeyUp(e) {
    if (e.code === 'Enter') {
      joinRoom()
    }
  }

  return (
    <div className='joinRoomContainer'>
      <div className='formContainer'>
        <img
          className='join-room-logo'
          src='/codesplit.png'
          alt='codesplit-logo'
        />
        <h4 className='join-label'>Paste Invitation ROOM ID</h4>
        <div className='input-group'>
          <input
            className='text-field'
            type='text'
            placeholder='Enter Room ID'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <input
            className='text-field'
            type='text'
            placeholder='Enter User Name'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button onClick={joinRoom} className='btn join-btn'>
            Join
          </button>
        </div>
        <p className='create-room-info'>
          Don't have an invitation, create &nbsp;
          <span onClick={onClickNewRoom} className='create-room-btn'>
            new room
          </span>
        </p>
      </div>
    </div>
  )
}

export default JoinRoom
