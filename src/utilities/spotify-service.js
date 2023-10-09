import * as spotifyAPI from "./spotify-api"

// const dotenv = require('dotenv')
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID // variable holding client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export async function login() {
    if (!code) {
        spotifyAPI.redirectToAuthCodeFlow(clientId)
    } else {
        const accessToken = await spotifyAPI.getAccessToken(clientId, code);
        const profile = await spotifyAPI.fetchProfile(accessToken);
        return profile
    }
}



lskjdflkjsdff