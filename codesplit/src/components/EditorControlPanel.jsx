import React, { useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import Select from 'react-select'
import { tabSizes, themes, languages } from '../utils/settingsOptions'
import { EditorSettingsContext } from '../context/editorSettings'

const EditorControlPanel = (props) => {
  const { setEditorTheme, setEditorTabSize, setEditorLanguage } = useContext(
    EditorSettingsContext
  )

  return (
    <React.Fragment>
      <div className='editor-controls'>
        <ul className='controls-list'>
          <li
            data-tooltip-id='editor-tooltip'
            data-tooltip-content='Settings'
            data-tooltip-place='left'
            className='controls-list-item'
            onClick={props.toggleControlPanel}
          >
            <i className='fa-solid fa-gear'></i>
          </li>
          <li
            data-tooltip-id='editor-tooltip'
            data-tooltip-content='Download'
            data-tooltip-place='left'
            className='controls-list-item'
            onClick={props.downloadFile}
          >
            <i className='fa-solid fa-download'></i>
          </li>
          <li
            data-tooltip-id='editor-tooltip'
            data-tooltip-content='Upload'
            data-tooltip-place='left'
            className='controls-list-item'
          >
            <i className='fa-solid fa-upload'></i>
          </li>
        </ul>
      </div>
      <div className='control-sidebar'>
        <div className='close-btn-container' onClick={props.toggleControlPanel}>
          <i className='fa-solid fa-xmark'></i>
        </div>
        <h2 className='control-sidebar-title'>Settings</h2>
        <div className='settings-form-container'>
          <label className='setting-form-label'>Language</label>
          <Select
            defaultValue={languages[42]}
            onChange={(language) => setEditorLanguage(language.value)}
            className='setting-form-select'
            options={languages}
          />
          <label className='setting-form-label'>Theme</label>
          <Select
            defaultValue={themes[12]}
            onChange={(theme) => setEditorTheme(theme.value)}
            className='setting-form-select'
            options={themes}
          />
          <label className='setting-form-label'>Tab Size</label>
          <Select
            defaultValue={tabSizes[0]}
            onChange={(size) => setEditorTabSize(size.value)}
            className='setting-form-select'
            options={tabSizes}
          />
        </div>
      </div>
      <Tooltip id='editor-tooltip' />
    </React.Fragment>
  )
}

export default React.memo(EditorControlPanel)
