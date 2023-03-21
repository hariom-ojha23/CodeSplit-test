import React from 'react'

const ControlPanelListItem = (props) => {
  return (
    <li
      data-tooltip-id='editor-tooltip'
      data-tooltip-content={props.content}
      data-tooltip-place={props.place}
      className='controls-list-item'
      onClick={props.onClick}
    >
      <i className={props.icon}></i>
    </li>
  )
}

export default React.memo(ControlPanelListItem)
