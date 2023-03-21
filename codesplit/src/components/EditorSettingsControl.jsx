import React, { useContext } from 'react'
import Select from 'react-select'
import { tabSizes, themes, languages } from '../utils/settingsOptions'
import { EditorSettingsContext } from '../context/editorSettings'

const EditorSettingsControl = () => {
  const { setEditorTheme, setEditorTabSize, setEditorLanguage } = useContext(
    EditorSettingsContext
  )

  return (
    <div className='settings-form-container sidebar-content'>
      <h2 className='control-sidebar-title'>Settings</h2>

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
  )
}

export default React.memo(EditorSettingsControl)
