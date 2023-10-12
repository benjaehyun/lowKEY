const mongoose = require('mongoose')
const Schema = mongoose.Schema


const spotifyTokenSchema = new Schema ({
    token: {
        type: String, 
        default: null
    }
},{
    timestamps: true
})


const profileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    name: {type: String, default: null},
    age: {type: Number, default: null},
    about: {type: String, default: null},
    genres: {type: String, default: null},
    artists: {type: String, default: null},
    spotifyToken: spotifyTokenSchema,
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