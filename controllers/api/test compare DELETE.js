const Profile = require('../../models/profile')
const Playlist = require('../../models/playlist')
const profile = require('../../models/profile')

async function queueIndex(req, res) {
    try {
        const myProfile = await Profile.findOne({user: req.user._id})
        let excludeArr = myProfile.dislikes.map((id) => `ObjectId(${id})`)
        excludeArr.push(`${myProfile._id}`)
        excludeArr.push(myProfile.likes.forEach( (id) => `ObjectId(${id})`))
        excludeArr.push(myProfile.matches.forEach( (id) => `ObjectId(${id})`))
        const profileList = await Profile.find({_id: {$nin: excludeArr}}).limit(10)
        // may have been a better idea to embed playlist 
        const profileListIdList = profileList.map((profile) => `ObjectId(${profile._id})`)
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

        res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// helper 

function findDistance (a, b) {
    return Math.pow((a - b), 2)
}