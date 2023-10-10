import { useState, useEffect } from "react"
import * as spotifyService from "../../utilities/spotify-service"

export default function SpotifyLoginPage({user}) {
    const [loginTrigger, setLoginTrigger] = useState([])

    // useEffect(function () {
    //     async function spotifyLogin() {
    //         const spotifyProfile = await spotifyService.login() 
    //         // setProfile(spotifyProfile)
    //         // need to append the spotify info to the user object 
    //     }
    //     spotifyLogin()
    // }, [loginTrigger])

    async function handleClick() {
        const spotifyProfile = await spotifyService.login() 
    }

    return (
        <>
            <h1> Welcome to the the newest Dating app on the block </h1>
            <h2>To use this app, you need to be logged into Spotify</h2>
            <button onClick={handleClick}>Click To Login</button>

        </>
    )
}