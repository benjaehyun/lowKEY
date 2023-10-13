import {useState, useEffect} from 'react'

export default function MatchCard({profile, setIsMatched}) {
    const [spotProfile, setSpotProfile] = useState({})
    
    function handleContinue() {
        setIsMatched(false)
    }
    
    return (
        <>
            <h1> You Matched With {profile.name} !  </h1>
            <button onClick={handleContinue}>Keep Swiping </button>
            <button> Go To See Your Match </button>

        </>
    )
}