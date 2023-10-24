import * as profilesAPI from "./profiles-api"

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID

export default async function sendSpotifyRequest(url, args = null, method = 'GET') {
    const access_token = await checkSpotifyToken()
    const options = { method };
    options.headers = {Authorization: `Bearer ${access_token}`}
    let apiUrl = url.concat(args || '')
    const res = await fetch(apiUrl, options);
    if (res.ok) return res.json();
    throw new Error('Bad Request', error.message);
  }

export async function checkSpotifyToken() {
  let profile = await profilesAPI.getProfile()
  const modified = profile.spotifyToken.updatedAt
  const modifiedDate = new Date(modified)
  const deltaDate = (Date.now() - modifiedDate) / 60000
  if (deltaDate >= 60) {
    profile = requestRefreshToken(profile.spotifyRefresh) 
  }
  const access_token = profile.spotifyToken.token
  return access_token
}


//helper functions
async function requestRefreshToken(spotifyRefresh) {
  let body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: spotifyRefresh,
    client_id: clientId,
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
  if (!res.ok) {
    throw new Error ('HTTP status' + res.status)
  }
  const data = await res.json()
  localStorage.setItem('access_token', data.access_token)
  const profile = await profilesAPI.createProfile(data.access_token, data.refresh_token)
  return profile
}
