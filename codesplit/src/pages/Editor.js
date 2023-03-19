import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import Actions from '../utils/actions'
import ClientItem from '../components/ClientItem'
import EditorComponent from '../components/EditorComponent'
import EditorControlPanel from '../components/EditorControlPanel'
import { initSocket } from '../utils/socket'
import toast from 'react-hot-toast'

import { SocketUserContext } from '../context/SocketUserContext'

const Editor = () => {
  const [clients, setClients] = useState([])
  const [controlPanel, setControlPanel] = useState('close')

  const { setSocketUserRef } = useContext(SocketUserContext)

  const location = useLocation()
  const { roomId } = useParams()

  const redirectTo = useNavigate()
  const socketRef = useRef(null)
  const codeRef = useRef(null)

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket()
      setSocketUserRef(socketRef.current)
      socketRef.current.on('connect_error', (err) => handleErrors(err))
      socketRef.current.on('connect_failed', (err) => handleErrors(err))

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        username: location.state?.username,
      })

      // listening for joined event
      socketRef.current.on(
        Actions.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(username + ' joined the room')
            console.log(username + ' joined')
          }

          setClients(clients)

          // sending code change event to sync editor on joining
          socketRef.current.emit(Actions.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          })
        }
      )

      // listening for disconnected event
      socketRef.current.on(Actions.DISCONNECTED, ({ socketId, username }) => {
        toast.success(username + ' left the room')
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId)
        })
      })
    }

    init()

    return () => {
      socketRef.current.disconnect()
      socketRef.current.off(Actions.JOINED)
      socketRef.current.off(Actions.DISCONNECTED)
    }
  }, [])

  function handleErrors(e) {
    console.log('socket error', e)
    toast.error('Socket connection failed, try again later')
    redirectTo('/', { replace: true })
  }

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId)
      toast.success('Room Id has been copied')
    } catch (error) {
      toast.error('Could not copy Room Id')
    }
  }

  function leaveRoom() {
    redirectTo('/', { replace: true })
  }

  const toggleControlPanel = useCallback(() => {
    if (controlPanel === 'close') {
      setControlPanel('open')
    } else {
      setControlPanel('close')
    }
  }, [controlPanel])

  const onCodeChange = useCallback(
    (code) => {
      codeRef.current = code
    },
    [codeRef.current]
  )

  function downloadFile() {
    const element = document.createElement('a')
    const code = codeRef.current === null ? '' : codeRef.current
    const file = new Blob([code], {
      type: 'text/plain',
    })

    element.href = URL.createObjectURL(file)
    element.download = 'codesplit.txt'
    document.body.appendChild(element)
    element.click()

    toast.success('File downloaded successfully')
  }

  if (!location.state) {
    return <Navigate to='/joinroom' />
  }

  return (
    <div className='editorPageContainer'>
      <div className='sidebarContainer'>
        <div className='sidebarInner'>
          <div className='logo-container'>
            <img
              className='editor-logo'
              src='/codesplit.png'
              alt='codesplit-logo'
            />
          </div>
          <h4 className='editor-connected-info'>
            Connected <span>{`(${clients.length})`}</span>
          </h4>
          <div className='client-list'>
            {clients.map((client) => (
              <ClientItem key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        <button onClick={copyRoomId} className='btn sidebar-copy-btn'>
          Copy Room Id
        </button>
        <button onClick={leaveRoom} className='btn sidebar-leave-btn'>
          Leave
        </button>
      </div>
      <div className='editorContainer'>
        <EditorComponent
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={onCodeChange}
        />
      </div>

      <div className={`controlPanelContainer ${controlPanel}`}>
        <EditorControlPanel
          toggleControlPanel={toggleControlPanel}
          controlPanel={controlPanel}
          downloadFile={downloadFile}
          socketRef={socketRef}
          roomId={roomId}
        />
      </div>
    </div>
  )
}

export default Editor
