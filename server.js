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
        origin: "https://lowkey-08ba0f67b0aa.herokuapp.com/"
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

            io.to(obj.chatroomID).emit('receive-message', obj.chatroomState)
            

        } catch (err) {
            console.log(err)
        }
    })
    connectedSocket.on('disconnect', () => 
    console.log('socket disconnected')
    )
})

const port = process.env.PORT || 3001;



server.listen(port, function() {
console.log(`Express app running on port ${port}`)
});