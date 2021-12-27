const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) =>{
  res.render('index.html')
})

let mensagens = []

io.on('connection', socket =>{
  console.log(`socket conectado: ${socket.id}`)

  socket.emit('mensagemAntiga', mensagens)

  socket.on('mensagemEnviada', dados => {
    mensagens.push(dados)
    socket.broadcast.emit('recieveMsg', dados)
  })
})

server.listen(3000)