import io  from 'socket.io-client'


const socket = io.connect("https://lowkey-08ba0f67b0aa.herokuapp.com/") 
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