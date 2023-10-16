const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema ({
    content: {
        type: String, 
        required: true
    }, 
    sender: {
        type: String,
    },
},{
    timestamps: true
})

const chatRoomSchema = new Schema ({
    messages: [messageSchema], 
    profiles: [{
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Chatroom', chatRoomSchema)