

module.exports={
    calculateQueue, 
    calculateSimilarity
}

function calculateQueue(playlistArr, myPlaylist) {
    let scoredPlaylistArr = []
    playlistArr.forEach( function (playlist){
        const energySimilarity = []
        const instrumentSimilarity = []
        const danceabilitySimilarity = []
        const acousticSimilarity = []
        const valenceSimilarity = []
        for (let i = 0; i < myPlaylist.acousticness.length; i ++) { // choose a random array from the playlist attributes because theyre all the same length 
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
    return scoredPlaylistArr
}





function calculateSimilarity(playlist, myPlaylist) {
    const energySimilarity = []
    const instrumentSimilarity = []
    const danceabilitySimilarity = []
    const acousticSimilarity = []
    const valenceSimilarity = []
    for (let i = 0; i < myPlaylist.acousticness.length; i ++) { // choose a random array from the playlist attributes because theyre all the same length 
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
    const energyNum = totalScore - energyScore
    const instrumentNum = totalScore/1.22 - instrumentScore
    const danceabilityNum = totalScore - danceabilityScore
    const acousticNum = totalScore - (acousticScore/2)
    const valenceNum = totalScore - valenceScore
    const scoreArr = [energyNum, instrumentNum, danceabilityNum, acousticNum, valenceNum]
    return scoreArr
}











//helper function 
function findDistance (a, b) {
    return Math.pow((a - b), 2)
}