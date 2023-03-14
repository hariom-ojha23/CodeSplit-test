import React from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const content = useRoutes(routes)

  return (
    <React.Fragment>
      <div>
        <Toaster position='top-right' />
      </div>
      <div>{content}</div>
    </React.Fragment>
  )
}

export default App
