const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const {Server} = require('socket.io')
const http = require('http')
const cors = require('cors')
// always require and configure near the top 
require('dotenv').config()

// connect to database 
require('./config/database')
   
const app = express();
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        // origin: "*", 
        // methods: ['GET', 'POST'],
        origin: "http://localhost:3000"
    }
})

app.use(logger('dev'));
app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'))

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/playlist', require('./routes/api/playlist'))

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const Profile = require('./models/profile')
const ChatRoom = require('./models/chatRoom')
io.on('connection', (connectedSocket) => {
    // socket.broadcast.emit('connection established')
    // console.log('connected to socket')
    connectedSocket.on('join-room', chatroomID => {
        connectedSocket.join(chatroomID)
    })
    connectedSocket.on('send-message', async (obj) => {
        try{
            console.log('obj', obj)
            // console.log('chatRoomId', data.chatroomId)
            const chatroom = await ChatRoom.findOne({_id: obj.chatroomID})
            const message = obj.newMessage
            chatroom.messages.push(message)
            console.log('chatroom',chatroom)
            chatroom.save()
            obj.chatroomState.push(obj.newMessage)
            // console.log(obj)
            // io.emit('receive-message', obj.chatroomState)
            // connectedSocket.to(obj.chatroomID).emit('receive-message', obj.chatroomState)
            io.to(obj.chatroomID).emit('receive-message', obj.chatroomState)
            
            //back end call to push the data 
        } catch (err) {
            console.log(err)
        }
        // console.log('data',JSON.stringify(data))
    })
    connectedSocket.on('disconnect', () => 
    console.log('socket disconnected')
    )
})
// io.on('connection', (connectedSocket) => {
//     // socket.broadcast.emit('connection established')
//     console.log('connected to socket')
//     connectedSocket.on('message', async (data) => {
//         try{
//             console.log('data', data)
//             console.log('chatRoomId', data.chatroomId)
//             const chatroom = await ChatRoom.findOne({_id: data.chatroomId})
//             const message = {
//                 content: data.message, 
//                 sender: data.sender
//             }
//             chatroom.messages.push(message)
//             console.log('chatroom',chatroom)
//             chatroom.save()
//             //back end call to push the data 
//         } catch (err) {
//             console.log(err)
//         }
//         console.log('data',JSON.stringify(data))
//     })
//     connectedSocket.on('disconnect', () => 
//     console.log('socket disconnected')
//     )
// })
// io.on('client-data', (data) => {
//     console.log(data)
// })

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;



server.listen(port, function() {
console.log(`Express app running on port ${port}`)
});