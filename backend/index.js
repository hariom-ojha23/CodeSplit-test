const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require('http')
const { Server } = require('socket.io')
const Actions = require('./utils/actions')
const redis = require('redis')

const { host, password, port } = require('./config').redis

dotenv.config()

const redisClient = redis.createClient({
  socket: {
    host: host,
    port: port,
  },
  password: password,
})
redisClient
  .connect()
  .then(() => console.log('connected to redis'))
  .catch((err) => console.log(err))

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://codesplit-frontend.onrender.com',
  },
})

app.use(express.json())
app.use(
  cors({
    origin: 'https://codesplit-frontend.onrender.com',
  })
)

async function getAllConnectedClients(roomId) {
  return new Promise(async (resolve, reject) => {
    try {
      const arr = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
      const res = []
      for (let i = 0; i < arr.length; i++) {
        await redisClient
          .get(arr[i])
          .then((username) => {
            res.push({
              socketId: arr[i],
              username,
            })
          })
          .catch((err) => console.log('cannot get user from redis', err))
      }
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

let chatMessages = []

io.on('connection', (socket) => {
  socket.on(Actions.JOIN, async ({ roomId, username }) => {
    await redisClient
      .set(socket.id, username)
      .catch((error) => console.log('cannot set username to redis', error))

    socket.join(roomId)

    // getting list of all client and notifying that someone joined the room
    await getAllConnectedClients(roomId)
      .then((clients) => {
        clients.forEach(({ socketId }) => {
          io.to(socketId).emit(Actions.JOINED, {
            clients,
            username,
            socketId: socket.id,
          })
        })
      })
      .catch((err) => console.log('cannot get all clients', err))
  })

  // listening for code changes
  socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(Actions.CODE_CHANGE, { code })
  })

  // listening for syncing code on first join
  socket.on(Actions.SYNC_CODE, ({ code, socketId }) => {
    io.to(socketId).emit(Actions.CODE_CHANGE, { code })
  })

  // listening for incoming messages
  socket.on(Actions.SEND_MESSAGE, async ({ roomId, message }) => {
    await redisClient
      .get(socket.id)
      .then((sender) => {
        const res = {
          id: socket.id,
          sender: sender,
          message: message,
        }

        chatMessages.push(res)
        io.to(roomId).emit(Actions.RECEIVE_MESSAGE, chatMessages)
      })
      .catch((err) => console.log(err))
  })

  // listening for syncing messages on first join
  socket.on(Actions.SYNC_MESSAGE, ({ socketId }) => {
    io.to(socketId).emit(Actions.RECEIVE_MESSAGE, chatMessages)
  })

  // listening for disconnecting
  socket.on('disconnecting', async () => {
    const rooms = [...socket.rooms]

    rooms.forEach(async (room) => {
      socket.in(room).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        username: await redisClient.get(socket.id),
      })
    })

    await redisClient
      .del(socket.id)
      .catch((err) => console.log('cannot delete a key from redis', err))

    chatMessages = []
    socket.leave()
  })
})

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('server is running at port ' + PORT)
})
