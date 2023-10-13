const User = require('../../models/user')
const Profile = require('../../models/profile')
const Playlist = require('../../models/playlist')

module.exports = {
    create, 
    details, 
    updateToken,
    addInfo, 
    queueIndex,
    addDislike, 
    addLike, 
    addMatch, 
}

async function create (req, res) {
    try {
        
        req.body.user = req.user._id
        req.body.name = req.user.name
        let token = req.body.accessToken 
        req.body.spotifyRefresh = req.body.refreshToken 
        const profile = await Profile.findOneAndUpdate({user: req.user._id}, req.body, {new: true, upsert: true})
        profile.spotifyToken = {'token' : token}
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function details (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user._id})
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
        const newInfo = req.body.form
        const profile = await Profile.findOneAndUpdate({user: req.user._id}, newInfo)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function queueIndex(req, res) {
    try {
        const myProfile = await Profile.findOne({user: req.user._id})
        // let excludeArr = myProfile.dislikes.map((id) => `ObjectId(${id})`)
        let excludeArr = myProfile.dislikes.map((id) => id)
        excludeArr.push(`${myProfile._id}`)
        // excludeArr.push(myProfile.likes.forEach( (id) => `ObjectId(${id})`))
        // excludeArr.push(myProfile.matches.forEach( (id) => `ObjectId(${id})`))
        excludeArr = excludeArr.concat(myProfile.likes)
        excludeArr = excludeArr.concat(myProfile.matches)
        const profileList = await Profile.find({_id: {$nin: excludeArr}}).limit(10)
        // may have been a better idea to embed playlist 
        // const profileListIdList = profileList.map((profile) => `ObjectId(${profile._id})`)
        const profileListIdList = profileList.map((profile) => profile._id)
        const myPlaylist = await Playlist.findOne({profile: myProfile._id})
        const playlistArr = await Playlist.find({profile : {$in : profileListIdList}})
        const scoredPlaylistArr = []

        playlistArr.forEach( function (playlist){
            const energySimilarity = []
            const instrumentSimilarity = []
            const danceabilitySimilarity = []
            const acousticSimilarity = []
            const valenceSimilarity = []
            for (let i = 0; i < myPlaylist.acousticness.length; i ++) { // choose a random array in the playlist attribute because theyre all the same length 
                energySimilarity.push(
                    findDistance(myPlaylist.energy[i], playlist.energy[i])
                    )
                instrumentSimilarity.push(
                    findDistance(myPlaylist.instrument[i], playlist.instrument[i])
                    )
                danceabilitySimilarity.push(
                    findDistance(myPlaylist.danceability[i], playlist.danceability[i])
                    )
                acousticSimilarity.push(
                    findDistance(myPlaylist.acousticness[i], playlist.acousticness[i])
                    )
                valenceSimilarity.push(
                    findDistance(myPlaylist.valence[i], playlist.valence[i])
                    )
            }
            const energyScore = Math.sqrt(energySimilarity.reduce(function (x,y) {   // should add up all of the "distances" between the two arrays and sqrt it into a single score 
                return x+y
            }, 0))
            const instrumentScore = Math.sqrt(instrumentSimilarity.reduce(function (x,y) {  
                return x+y
            }, 0))
            const danceabilityScore = Math.sqrt(danceabilitySimilarity.reduce(function (x,y) {    
                return x+y
            }, 0))
            const acousticScore = Math.sqrt(acousticSimilarity.reduce(function (x,y) {    
                return x+y
            }, 0))
            const valenceScore = Math.sqrt(valenceSimilarity.reduce(function (x,y) {   
                return x+y
            }, 0))
            const totalScore = energyScore + instrumentScore + danceabilityScore + acousticScore + valenceScore // need to go back and use weighted values for this sum based on the psych research paper and the range of each value 
            scoredPlaylistArr.push({
                playlist: playlist, 
                score: totalScore
            })
        } )
        scoredPlaylistArr.sort((a,b) => a.score - b.score)

        for (let i = 0; i < scoredPlaylistArr.length; i ++) {
            scoredPlaylistArr[i].profile =  await Profile.findOne({user: scoredPlaylistArr[i].playlist.user})
        }
        // console.log('scoredPlaylistArr: ', scoredPlaylistArr)
        res.json(scoredPlaylistArr)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addDislike(req, res) {
    try {
        console.log(req.body)
        const profile = await Profile.findOne({user: req.user._id})
        profile.dislikes.push(req.body.id)
        console.log(profile.dislikes)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addLike(req, res) {
    try {
        const profile = await Profile.findOne({user: req.user._id})
        profile.likes.push(req.body.id)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addMatch(req, res) {
    try {
        const profile = await Profile.findOne({user: req.user._id})
        profile.matches.push(req.body.id)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// helper 

function findDistance (a, b) {
    return Math.pow((a - b), 2)
}