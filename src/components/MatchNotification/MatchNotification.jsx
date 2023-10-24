import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./MatchNotification.css"

export default function MatchNotification({profile, setIsMatched}) {
    const [spotProfile, setSpotProfile] = useState({})

    const navigate = useNavigate()
    
    function handleContinue() {
        setIsMatched(false)
    }
    
    function goToMatch() {
        navigate('/matches')
    }
    
    return (
        <div className='match-noti'>
            <h1> You Matched With {profile.name} !  </h1>
            <Button onClick={handleContinue}>Keep Swiping </Button>
            <Button onClick={goToMatch}> Go To See Your Matches </Button>

        </div>
    )
}