const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true
    },
    spotifyId: {type: String, default: null},
    songId: [{type:String, default: null}], 
    songName: [{type:String, default: null}], 
    artist: [{type:String, default: null}], 
    album: [{type:String, default: null}],  
    energy: [{type:Number, default: null}],  
    instrument: [{type:Number, default: null}],  
    danceability: [{type:Number, default: null}],  
    acousticness: [{type:Number, default: null}],  
    valence: [{type:Number, default: null}],  
}, {
    timestamps: true
})








module.exports = mongoose.model('Playlist', playlistSchema)