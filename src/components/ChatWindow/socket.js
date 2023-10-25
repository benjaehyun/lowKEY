import io  from 'socket.io-client'


const socket = io.connect("http://localhost:3001") 
let setChatroomState

export function joinRoom(chatroomID) {
    socket.emit('join-room', chatroomID)
}

export function passSetChatroomState(setState) {
    setChatroomState = setState
}

export function sendChat (newMessage, chatroomState, chatroomID) {
    console.log(chatroomID)
    socket.emit('send-message', {newMessage, chatroomState, chatroomID})
}
socket.on('receive-message', function (chat) {
    setChatroomState(chat)
})