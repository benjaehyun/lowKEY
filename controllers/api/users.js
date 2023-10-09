const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
    create, 
    login, 
    checkToken, 
    addSpotifyToken
}

async function create (req, res) {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json(token)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function login (req, res) {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) throw new Error()
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error()
        const token = createJWT(user)
        res.json(token)
    } catch (err) {
        console.log(err)
        res.status(400).json('Bad Credentials')
    }
}

async function addSpotifyToken (req, res) {
    try {
        console.log(`req.body: ${JSON.stringify(req.body)}`)
        // const user = await User.findById(req.user._id) 
        const accessToken = req.body.accessToken
        console.log(` accessToken: ${accessToken}`)
        const user = await User.findOneAndUpdate({'_id': req.user._id}, {'spotifyToken': accessToken})
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

// Helper function 
function createJWT (user) {
    return jwt.sign(
        {user}, 
        process.env.SECRET, 
        {expiresIn: '24h'}
    )
}