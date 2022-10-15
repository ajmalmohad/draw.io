var socket = io();

function getParams(){
    let params = new URLSearchParams(document.location.search);
    let username = params.get("username");
    let roomname = params.get("roomname");
    return {username, roomname}
}

socket.emit('join', getParams())