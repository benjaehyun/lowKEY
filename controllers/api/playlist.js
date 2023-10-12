const User = require('../../models/user')
const Profile = require('../../models/profile')
const Playlist = require('../../models/playlist')

module.exports = {
    createTop,
    getOne, 
    addFeatures, 
    createPlaylist,
}

async function createTop (req, res) {
    try {
        console.log('req.body.data', req.body.data)
        const profile = await Profile.findOne({user: req.user._id})
        const info = {}
        info.profile = profile._id
        info.user = req.user._id
        const data = req.body.data 
        let songName = []
        let songId = []
        let album = []
        let artistArr = []
        data.items.forEach(function (item) {
            let tempArr = []
            item.artists.forEach((artist) => tempArr.push(artist.name))
            artistArr = artistArr.concat(tempArr)
            songName.push(item.name)
            songId.push(item.id)
            album.push(item.album.name)
        })
        info.artist = artistArr
        info.album = album
        info.songId = songId
        info.songName = songName
        const playlist = await Playlist.create(info)
        res.json(playlist)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function getOne (req, res) {
    try {
        const playlist = await Playlist.findOne({user: req.user._id})
        res.json(playlist)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addFeatures (req, res) {
    try {
        const data = req.body.features.audio_features
        let features = {
            energy: [], 
            instrument: [],
            danceability: [],
            acousticness: [],
            valence: [],
        }
        data.forEach(function (song) {
            features.energy.push(song.energy)
            features.instrument.push(song.instrumentalness)
            features.danceability.push(song.danceability)
            features.acousticness.push(song.acousticness)
            features.valence.push(song.valence)
        })
        const playlist = await Playlist.findOneAndUpdate({user: req.user._id}, features)
        console.log('playlist', playlist)
        res.json(playlist)
        // res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function createPlaylist (req, res) {
    try {
        console.log('req.body.data', req.body.data)
        const profile = await Profile.findOne({user: req.user._id})
        const info = {
            profile: profile._id, 
            user: req.user._id, 
            songName: [], 
            songId: [], 
            album: [], 
            artist: [], 
        }
        const data = req.body.data 
        let artistArr = []
        data.items.forEach(function (item) {
            let tempArr = []
            item.track.artists.forEach((artist) => tempArr.push(artist.name))
            artistArr = artistArr.concat(tempArr)
            info.songName.push(item.track.name)
            info.songId.push(item.track.id)
            info.album.push(item.track.album.name)
        })
        info.artist = artistArr
        const playlist = await Playlist.create(info)
        res.json(playlist)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}