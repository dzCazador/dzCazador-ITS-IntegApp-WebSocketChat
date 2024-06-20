const express = require('express'); 
const app = express();  
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.static(__dirname + '../../public')); 

let message =[
    {author: 'Juan', text: 'Hora! Que Tal?'},
    {author: 'Pedro', text: 'Muy Bien y vos?'},
    {author: 'Ana', text: 'Genial!_'}
]

server.listen(process.env.PORT || 8080,() => {
    console.log('Server is running on port 8080\nhttp://localhost:8080');
    }
);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})


io.on('connection',function(socket) {
    console.log('a user connected');
    socket.emit('messages', message);
    socket.on('new-message', function(data) {
        message.push(data);
        io.sockets.emit('messages', message);
    })
    socket.on('disconnect', function() {
        console.log('Usuario Desconectado');
    })
})


