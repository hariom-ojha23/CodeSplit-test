import Home from './pages/Home'
import Editor from './pages/Editor'
import JoinRoom from './pages/JoinRoom'

const routes = [
  {
    path: '',
    children: [
      { path: '/', element: <Home /> },
      { path: 'joinroom', element: <JoinRoom /> },
      { path: 'editor/:roomId', element: <Editor /> },
    ],
  },
]

export default routes
