import * as spotifyAPI from "./spotify-api"
import * as usersAPI from "./users-api"

// const dotenv = require('dotenv')
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID // variable holding client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export async function login() {
    console.log(`code: ${code}`)
    if (!code) {
        spotifyAPI.redirectToAuthCodeFlow(clientId)
    } else {
        const accessToken = await spotifyAPI.getAccessToken(clientId, code);
        console.log(`react util accessToken: ${accessToken}`)
        const userRes = await usersAPI.addAccessToken(accessToken) 
    }
}

export async function getProfile(accessToken) {
    const profile = await spotifyAPI.fetchProfile(accessToken);
    return profile
}

