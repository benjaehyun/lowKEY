import {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';
import CarouselItem from 'react-bootstrap/CarouselItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import * as profilesAPI from "../../utilities/profiles-api"
import './ProfileSwipeCard.css'
import MatchNotification from '../MatchNotification/MatchNotification'

export default function ProfileSwipeCard ({profile}) {
    const [profilesQueue, setProfilesQueue] = useState([])
    const [activeIdx, setActiveIdx] = useState(0)
    const [isMatched, setIsMatched] = useState(false)
    const [currentMatch, setCurrentMatch] = useState({})
    const [photoIndex, setPhotoIndex] = useState(0);

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
            const chatRoomId = await profilesAPI.sendMatch(profilesQueue[activeIdx].profile._id)
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

    const handleSelect = (selectedIndex) => {
        setPhotoIndex(selectedIndex);
      };

    const dataList = profilesQueue[activeIdx]?.profile?.photos.map((photo, idx)=> {
        return (
          <Carousel.Item interval={3000}>        
        <img
          height={'300px'}
          src={photo}
          alt="slider image"
          
        />
      </Carousel.Item>
        )
      })

    return (
        <div>
            { isMatched ? 
            <MatchNotification profile={currentMatch} setIsMatched={setIsMatched} />
            :
            <>
                {
                    profilesQueue[activeIdx]?.profile ?
                <div className='swipe-card'>
                    <h1>{profilesQueue[activeIdx].profile.name}, {profilesQueue[activeIdx].profile.age}</h1>
                    
                    <Carousel activeIndex={photoIndex} onSelect={handleSelect}>
                        {dataList}
                    </Carousel>


                    <div className='swipecard-info'>
                        <div>
                            <h3>about:</h3> <p>{profilesQueue[activeIdx].profile.about}</p>
                            <h4>favorite artists:</h4> {profilesQueue[activeIdx].profile.artists}
                            <h4>favorite genres:</h4> {profilesQueue[activeIdx].profile.genres}
                        </div>
                        <div>
                            <h4 className='found-label'>some songs from their songlist:&nbsp; </h4>
                            <div className='found-list'>
                                {showArr(profilesQueue[activeIdx].playlist.songName)}
                            </div>
                            <h4 className='found-label'>some artists found on their songlist:&nbsp;</h4>
                            <div className='found-list'>
                                {showArr(profilesQueue[activeIdx].playlist.artist)}
                            </div>
                            <h4 className='found-label'>some albums found on their songlist:&nbsp;</h4>
                            <div className='found-list'>
                                {showArr(profilesQueue[activeIdx].playlist.album)}
                            </div>
                        </div>
                    </div>
                    <div className='buttons-div'>
                        <FontAwesomeIcon className='fa-deny' icon={faCircleXmark} size="xl" style={{color: "#ff0000",}} onClick={handleDislike} />
                        <FontAwesomeIcon className='fa-like' icon={faHeart} size="xl" style={{color: "#1cd255",}} onClick={handleLike}/>
                    </div>
                </div>
                : 
                'loading profiles'
                }
            </>
            }
        </div>
    )
}