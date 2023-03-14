import React from 'react'
import Avatar from 'react-avatar'

const ClientItem = (props) => {
  return (
    <div className='client-item'>
      <Avatar name={props.username} size={50} round="14px" />
      <span className='client-username'>{props.username.slice(0, 8)}</span>
    </div>
  )
}

export default ClientItem