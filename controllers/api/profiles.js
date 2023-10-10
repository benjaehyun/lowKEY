const User = require('../../models/user')
const Profile = require('../../models/profile')

module.exports = {
    create, 
    details, 

}

async function create (req, res) {
    try {
        console.log('req.body:', req.body)

        req.body.user = req.user._id
        req.body.name = req.user.name
        req.body.spotifyToken=req.body.accessToken
        console.log(`profile req.body: ${JSON.stringify(req.body)}`)
        const profile = await Profile.create(req.body)
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
        console.log(`profile: ${profile}`)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
