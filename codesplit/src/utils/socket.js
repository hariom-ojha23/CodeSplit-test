import { io } from 'socket.io-client'

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
    upgrade: true,
  }

  const url = process.env.REACT_APP_BACKEND_URL

  return io(url, options)
}
