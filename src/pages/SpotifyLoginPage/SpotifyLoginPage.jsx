import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import * as spotifyService from "../../utilities/spotify-service"
import { getUser } from "../../utilities/users-service"
import * as profilesAPI from '../../utilities/profiles-api'


export default function SpotifyLoginPage({ setProfile, profile}) {
  const[loginTrigger, setLoginTrigger] = useState(false)

  useEffect(
      function() {
        // if (loginTrigger) {
          async function requestUserAuth() {
            await spotifyService.requestUserAuth()
          }
          async function requestAccessToken() {
            try {
              const profile = await spotifyService.requestAccessToken()
              console.log(`spotify login profile: ${profile}`)
              setProfile(profile)
            } catch(err) {
              console.log(err)
            }
          }
         
          // if(!window.location.search && !profile?.spotifyToken) {
          if(!window.location.search) {
            requestUserAuth()
          } else if(!spotifyService.getAccessToken()) {
            requestAccessToken()
          }          
        // }
      
      }, [])
      // }, [loginTrigger])

      // window.history.pushState({}, null, '/')
      
   

    // async function handleClick() {
    //     const spotifyProfile = await spotifyService.login() 
    // }

    return (
        <>
            <h1> Welcome to the the newest Dating app on the block </h1>
            <p>In order to use lowKEY you must be logged into your Spotify Account</p>
            <Link to={'/'} > Go To Homepage </Link>
            {/* <button onClick={() => setLoginTrigger(true)}>Log In To Spotify</button> */}
            

        </>
    )
}