const User = require('../../models/user')
const Profile = require('../../models/profile')

module.exports = {
    create, 
    details, 
    updateToken,
    addInfo, 
}

async function create (req, res) {
    try {
        
        req.body.user = req.user._id
        req.body.name = req.user.name
        let token = req.body.accessToken 
        req.body.spotifyRefresh = req.body.refreshToken 
        console.log(`profile req.body: ${JSON.stringify(req.body)}`)
        // const profile = await Profile.create(req.body)
        const profile = await Profile.findOneAndUpdate({user: req.user._id}, req.body, {new: true, upsert: true})
        profile.spotifyToken = {'token' : token}
        await profile.save()
        console.log('profile:', profile)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function details (req, res) {
    try {
        console.log(`req.user._id: ${req.user._id}`)
        const profile = await Profile.findOne({user: req.user._id})
        console.log(`profile:`, profile)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function updateToken (req, res) {
    try {
        let token = req.body.accessToken 
        req.body.spotifyRefresh = req.body.refreshToken 
        req.body.spotifyToken = {'token' : token}
        const profile = await Profile.findOneAndUpdate({user: req.user._id}, req.body)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addInfo (req, res) {
    try {
        const profile = await Profile.findOneAndUpdate({user: req.user._id}, req.body)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}