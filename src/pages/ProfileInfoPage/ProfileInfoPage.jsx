import {useState, useEffect} from 'react'
import * as spotifyService from "../../utilities/spotify-service"

export default function ProfileInfoPage({user}) {
    const [spotProfile, setSpotProfile] = useState({})

    useEffect(function () {
        async function getSpotProfile() {
            const spotifyProfile = await spotifyService.getProfile(user.spotifyToken) 
            setSpotProfile(spotifyProfile)
            // need to append the spotify info to the user object 
        }
        getSpotProfile()
    }, [])

    return (
        <>
            <h1> profile info </h1>
            <p>Id: {spotProfile.id}</p>
            <p>Email: {spotProfile.email}</p>

        </>
    )
}