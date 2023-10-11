const mongoose = require('mongoose')
const Schema = mongoose.Schema


const profileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    name: {type: String, required: true},
    // spotify: [spotifySchema]
    spotifyToken: {
        type: String,
        default: null,    
    }, 
    spotifyRefresh: {
        type: String,
        default: null,   
    }, 
    spotifyId: {
        type: String,
        default: null,       
    }, 
}, {
    timestamps: true
})





module.exports = mongoose.model('Profile', profileSchema)