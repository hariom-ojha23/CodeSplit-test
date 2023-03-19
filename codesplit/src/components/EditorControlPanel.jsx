import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import ControlPanelListItem from './ControlPanelListItem'
import EditorSettingsControl from './EditorSettingsControl'
import MessagesContainer from './MessagesContainer'

const EditorControlPanel = (props) => {
  const [selectedItem, setSelectedItem] = useState(0)

  function handleClick(index) {
    if (props.controlPanel === 'open') setSelectedItem(index)
    else {
      setSelectedItem(index)
      props.toggleControlPanel()
    }
  }

  return (
    <React.Fragment>
      <div className='editor-controls'>
        <ul className='controls-list'>
          <ControlPanelListItem
            content='Settings'
            place='left'
            icon='fa-solid fa-gear'
            onClick={() => handleClick(0)}
          />
          <ControlPanelListItem
            content='Download'
            place='left'
            icon='fa-solid fa-download'
            onClick={props.downloadFile}
          />
          <ControlPanelListItem
            content='Upload'
            place='left'
            icon='fa-solid fa-upload'
          />
          <ControlPanelListItem
            content='Chats'
            place='left'
            icon='fa-solid fa-comments'
            onClick={() => handleClick(3)}
          />
        </ul>
      </div>
      <div className='control-sidebar'>
        <div className='close-btn-container' onClick={props.toggleControlPanel}>
          <i className='fa-solid fa-xmark'></i>
        </div>

        {selectedItem === 0 && <EditorSettingsControl />}
        {selectedItem === 3 && <MessagesContainer roomId={props.roomId} />}
      </div>
      <Tooltip id='editor-tooltip' />
    </React.Fragment>
  )
}

export default React.memo(EditorControlPanel)
