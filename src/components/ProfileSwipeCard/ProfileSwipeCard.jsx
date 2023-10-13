import {useState, useEffect} from 'react'
import * as profilesAPI from "../../utilities/profiles-api"
import './ProfileSwipeCard.css'
import MatchNotification from '../MatchNotification/MatchNotification'

export default function ProfileSwipeCard ({profile}) {
    const [profilesQueue, setProfilesQueue] = useState([])
    const [activeIdx, setActiveIdx] = useState(0)
    const [isMatched, setIsMatched] = useState(false)
    const [currentMatch, setCurrentMatch] = useState({})

    useEffect(function () {
        async function getFirstProfileQueue() {
            const apiProfList = await profilesAPI.getQueue()
            setProfilesQueue(apiProfList)
            console.log("profilesqueue", profilesQueue)
            setActiveIdx(0)
        }
        getFirstProfileQueue()
    },[])

    async function getProfileQueue() {
        const apiProfList = await profilesAPI.getQueue()
        setProfilesQueue(apiProfList)
        console.log("profilesqueue", profilesQueue)
        setActiveIdx(0)
    }

    async function handleLike() {
        await profilesAPI.sendLike(profilesQueue[activeIdx].profile._id)
        const currentProfile = await profilesAPI.getProfile()
        if (profilesQueue[activeIdx].profile.likes.includes(currentProfile._id)) {
            setIsMatched(true)
            setCurrentMatch(profilesQueue[activeIdx].profile)
            await profilesAPI.sendMatch(profilesQueue[activeIdx].profile._id)
        }
        if (activeIdx >= 10) {
            getProfileQueue()
        }
        setActiveIdx(activeIdx+1)
        
    }
    async function handleDislike() {
        await profilesAPI.sendDislike(profilesQueue[activeIdx].profile._id)
        if (activeIdx >= 10) {
            getProfileQueue()
        }
        setActiveIdx(activeIdx+1)
    }

    function removeDupes (arr) {
        let originalSet = new Set (arr)
        let newArr = Array.from(originalSet)
        const returnArr = newArr.slice(0,5)
        return returnArr
    }

    function showArr(arr) {
        const cleanArr = removeDupes(arr)
        const returnArr = cleanArr.map(function (el, idx) {
            if (idx < cleanArr.length - 1) return <p key={idx}>{el}, &nbsp;</p>
            else return <p key={idx}>{el} &nbsp;</p>
        })
        return returnArr
    }

    return (
        <div>
            <h1>profile swipe card component</h1>
            { isMatched ? 
            <MatchNotification profile={currentMatch} setIsMatched={setIsMatched} />
            :
            <>
                {
                    profilesQueue[activeIdx]?.profile ?
                <div>
                    <h1>{profilesQueue[activeIdx].profile.name}, {profilesQueue[activeIdx].profile.age}</h1>
                    <h3>about: {profilesQueue[activeIdx].profile.about}</h3>
                    <h4>favorite artists: {profilesQueue[activeIdx].profile.artists}</h4>
                    <h4>favorite genres: {profilesQueue[activeIdx].profile.genres}</h4>
                    <h4>some songs found on their songlist:&nbsp; </h4>
                        <div className='found-list'>
                            {showArr(profilesQueue[activeIdx].playlist.songName)}
                        </div>
                    <h4>some artists found on their songlist:&nbsp;</h4>
                        <div className='found-list'>
                            {showArr(profilesQueue[activeIdx].playlist.artist)}
                        </div>
                    <h4>some albums found on their songlist:&nbsp;</h4>
                        <div className='found-list'>
                            {showArr(profilesQueue[activeIdx].playlist.album)}
                        </div>
                    <button onClick={handleLike}> Like </button>
                    <button onClick={handleDislike}> Dislike </button>
                </div>
                : 
                'loading profiles'
                }
            </>
            }
        </div>
    )
}