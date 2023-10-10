import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import * as spotifyService from "../../utilities/spotify-service"
import { getUser } from "../../utilities/users-service"
import * as profilesAPI from '../../utilities/profiles-api'


export default function SpotifyLoginPage({user, setUser, setProfile}) {
    const [loginTrigger, setLoginTrigger] = useState([])

    // useEffect(function () {
    //     async function spotifyLogin() {
    //         const spotifyProfile = await spotifyService.login() 
    //         // setProfile(spotifyProfile)
    //         // need to append the spotify info to the user object 
    //     }
    //     spotifyLogin()
    // }, [loginTrigger])
    // const navigate = useNavigate()

    useEffect(
        function() {
        async function requestUserAuth() {
          await spotifyService.requestUserAuth()
        }
        async function requestAccessToken() {
          try {
            await spotifyService.requestAccessToken()
          } catch(err) {
            console.log(err)
          }
        }
        if(!window.location.search && !user.spotifyToken) {
          requestUserAuth()
        } else if(!spotifyService.getAccessToken()) {
          requestAccessToken()
        }
        console.log(`getProfile: ${JSON.stringify(profilesAPI.getProfile())}`)
        // setUser(getUser())
        async function getApiProfile () {
          const apiProfile = await profilesAPI.getProfile()
          setProfile(apiProfile)
        }
        getApiProfile()
        
     
      }, [])
      
   

    // async function handleClick() {
    //     const spotifyProfile = await spotifyService.login() 
    // }

    return (
        <>
            <h1> Welcome to the the newest Dating app on the block </h1>
            <Link to={'/'} > Go To Homepage </Link>
            

        </>
    )
}