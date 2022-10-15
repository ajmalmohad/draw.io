var socket = io();

function getParams(){
    let params = new URLSearchParams(document.location.search);
    let username = params.get("username");
    let roomname = params.get("roomname");
    return {username, roomname}
}

let chatbox = document.getElementById('chat')

let message = document.getElementById('message')
message.addEventListener('submit', (e)=>{
    e.preventDefault();
    let text = document.getElementById('text').value;
    socket.emit('message', text)
})

socket.emit('join', getParams())

socket.on('connectToRoom',(message)=>{
    console.log(message);
})

socket.on('textMessage', (message)=>{
    let div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <p>${message.author}</p>
    <p>${message.text}</p>
    <p>${message.time}</p>
    `
    chatbox.appendChild(div)
})