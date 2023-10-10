import {useState, useEffect} from 'react'
import * as spotifyService from "../../utilities/spotify-service"

export default function CallbackPage({user}) {
    const [spotProfile, setSpotProfile] = useState({})

    useEffect(
        function () {
            console.log(user.spotifyToken)
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