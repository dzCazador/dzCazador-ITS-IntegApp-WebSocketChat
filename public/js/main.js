let socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)
socket.on('messages', function(data) {
    console.log(data);
    render(data);
})

function render(data) {
    var html = data.map(function(elem, index){
        return  (`<div><strong>${elem.author}:</strong><em>${elem.text}</em></div>`)

    }).join(' ')
    document.getElementById('messages').innerHTML = html;
}

function enviarMensaje(autor,texto) {
    socket.emit('new-message',{author:autor,text:texto})    
}

