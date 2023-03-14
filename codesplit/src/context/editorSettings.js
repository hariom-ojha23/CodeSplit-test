import React, { createContext, useState } from 'react'

export const EditorSettingsContext = createContext()

const EditorSettingsProvider = ({ children }) => {
  const [editorTheme, setEditorTheme] = useState('dracula')
  const [editorLanguage, setEditorLanguage] = useState('javascript')
  const [editorTabsize, setEditorTabSize] = useState(2)

  return (
    <EditorSettingsContext.Provider
      value={{
        editorTheme,
        setEditorTheme,
        editorLanguage,
        setEditorLanguage,
        editorTabsize,
        setEditorTabSize,
      }}
    >
      {children}
    </EditorSettingsContext.Provider>
  )
}

export default EditorSettingsProvider
