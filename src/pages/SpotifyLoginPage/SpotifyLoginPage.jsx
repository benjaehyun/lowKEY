import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import * as spotifyService from "../../utilities/spotify-service"

export default function SpotifyLoginPage({ setProfile, profile}) {
  const navigate = useNavigate()
  useEffect(
      function() {
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
          if(!window.location.search && !spotifyService.getAccessToken()) {
            requestUserAuth()
          } else if(!spotifyService.getAccessToken()) {
            requestAccessToken()
          } 
        }, [])
        


    return (
      <>
        <h1>Spotify Account Connected!</h1>
        <Link to="/profile/create">
          <button> Continue To Create A Profile </button>
        </Link>
      </>
    )
}