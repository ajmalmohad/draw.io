var socket = io();
let username, roomname;

function getParams() {
    let params = new URLSearchParams(document.location.search);
    username = params.get("username");
    roomname = params.get("roomname");
    return { username, roomname }
}

let chatbox = document.getElementById('chat')
let message = document.getElementById('submit-img')
message.addEventListener('click', (e) => {
    let textbox = document.getElementById('text')
    console.log(textbox.value);
    if(textbox.value!=""){
        socket.emit('message', textbox.value)
        textbox.value = ""
        textbox.focus()
    }
})


document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        let textbox = document.getElementById('text')
        console.log(textbox.value);
        if(textbox.value!=""){
            socket.emit('message', textbox.value)
            textbox.value = ""
            textbox.focus()
        }
    }
});

socket.emit('join', getParams())

socket.on('connectToRoom', (message) => {
    console.log(message);
})

socket.on('textMessage', (message) => {
    let div = document.createElement('div')
    div.classList.add('message')
    if(message.author==username){
        div.classList.add('mine')
    }
    div.innerHTML = `
    <p class="author">${message.author}</p>
    <p>${message.text}</p>
    <p class="time">${message.time}</p>
    `
    console.log(div);
    chatbox.appendChild(div)
    chat.scrollTop = chat.scrollHeight;
})