import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'

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
        <>
            <h1> You Matched With {profile.name} !  </h1>
            <button onClick={handleContinue}>Keep Swiping </button>
            <button onClick={goToMatch}> Go To See Your Matches </button>

        </>
    )
}