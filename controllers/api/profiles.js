const User = require('../../models/user')
const Profile = require('../../models/profile')
const Playlist = require('../../models/playlist')
const calculationHelper = require('./calculation-helper')

module.exports = {
    create, 
    details, 
    updateToken,
    addInfo, 
    queueIndex,
    addDislike, 
    addLike, 
    addMatch, 
    getMatches, 
    getMatchData, 
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
        let excludeArr = myProfile.dislikes.map((id) => id)
        excludeArr.push(`${myProfile._id}`)
        excludeArr = excludeArr.concat(myProfile.likes)
        excludeArr = excludeArr.concat(myProfile.matches)
        const profileList = await Profile.find({_id: {$nin: excludeArr}}).limit(10)
        // may have been a better idea to embed playlist 
        const profileListIdList = profileList.map((profile) => profile._id)
        const myPlaylist = await Playlist.findOne({profile: myProfile._id})
        const playlistArr = await Playlist.find({profile : {$in : profileListIdList}})
        let scoredPlaylistArr = []
        scoredPlaylistArr = calculationHelper.calculateQueue(playlistArr, myPlaylist)
        for (let i = 0; i < scoredPlaylistArr.length; i ++) {
            scoredPlaylistArr[i].profile =  await Profile.findOne({user: scoredPlaylistArr[i].playlist.user})
        }
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
        const match = await Profile.findOne({_id: req.body.id})
        match.matches.push(profile._id)
        await match.save() 
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function getMatches (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user._id})
        const matchesList = await Profile.find({_id: {$in: profile.matches}})

        res.json(matchesList)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function getMatchData(req, res) {
    try {
        const myPlaylist = await Playlist.findOne({user: req.user._id})
        const matchPlaylist = await Playlist.findOne({profile: req.body.profile._id})
        const scores = calculationHelper.calculateSimilarity(matchPlaylist, myPlaylist)
        const sameSongs = myPlaylist.songName.filter(el => matchPlaylist.songName.includes(el))
        const sameAlbums = myPlaylist.album.filter(el => matchPlaylist.album.includes(el))
        const sameArtists = myPlaylist.artist.filter(el => matchPlaylist.artist.includes(el))
        const data = {
            scores: scores, 
            songs: sameSongs, 
            albums: sameAlbums, 
            artists: sameArtists
        }
        res.json(data)
        
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// helper 

function findDistance (a, b) {
    return Math.pow((a - b), 2)
}