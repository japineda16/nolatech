import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id)

  socket.on('new-post', (data) => {
    console.log('Nuevo post recibido:', data)
    
    // Simular procesamiento
    setTimeout(() => {
      socket.emit('post-response', {
        success: true,
        message: 'Publicación creada exitosamente en el servidor',
        data
      })
    }, 1000)
  })

  socket.on('post-updated', (data) => {
    console.log('Post actualizado:', data)
    
    // Simular procesamiento
    setTimeout(() => {
      socket.emit('post-response', {
        success: true,
        message: 'Publicación actualizada exitosamente en el servidor',
        data
      })
    }, 1000)
  })

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id)
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`)
})