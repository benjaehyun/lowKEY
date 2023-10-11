import {useState, useEffect} from 'react'
import * as spotifyService from "../../utilities/spotify-service"


export default function ProfileInfo({profile}) {
    const [spotProfile, setSpotProfile] = useState({})

    useEffect(function () {
        async function getSpotProfile() {
            const spotifyProfile = await spotifyService.getProfile(profile.spotifyToken) 
            setSpotProfile(spotifyProfile)
            // need to append the spotify info to the user object 
        }
        getSpotProfile()
    },[])
    
    return (
        <>
            <h1> profile info </h1>
            <p>{spotProfile.display_name}</p>
            <p>Id: {spotProfile.id}</p>
            <p>Email: {spotProfile.email}</p>

        </>
    )
}