import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import * as spotifyService from "../../utilities/spotify-service"

export default function SpotifyLoginPage({ setProfile, profile}) {

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
          if(!window.location.search) {
            requestUserAuth()
          } else if(!spotifyService.getAccessToken()) {
            requestAccessToken()
          }          
      }, [])


    return (
        <>
            <h1> Welcome to the the newest Dating app on the block </h1>
            <p>In order to use lowKEY you must be logged into your Spotify Account</p>
            <Link to={'/'} > Go To Homepage </Link>
        </>
    )
}