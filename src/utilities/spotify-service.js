import * as spotifyAPI from "./spotify-api"
import * as usersAPI from "./users-api"
import * as profilesAPI from "./profiles-api"

export async function getProfile(accessToken) {
    const profile = await spotifyAPI.fetchProfile(accessToken);
    return profile
}

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID

const redirectUri = 'http://localhost:3000/';
let codeVerifier = generateRandomString(128);

// Service Functions
export async function requestUserAuth() {
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  localStorage.setItem('code_verifier', codeVerifier);

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location = 'https://accounts.spotify.com/authorize?' + args;
}

export async function requestAccessToken() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  let codeVerifier = localStorage.getItem('code_verifier');

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
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
  console.log('data' , data)
  localStorage.setItem('access_token', data.access_token)
  const profile = await profilesAPI.createProfile(data.access_token, data.refresh_token, data.)
  return profile
}

export function getAccessToken() {
  return localStorage.getItem('access_token') || null
}

// Helper functions
function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}