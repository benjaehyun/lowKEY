// import * as sendSpotifyRequest from "./send-spotify-request";
import sendSpotifyRequest from "./send-spotify-request";

export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export async function fetchPlaylists () {
    const url = 'https://api.spotify.com/v1/me/playlists'
    const result = await sendSpotifyRequest(url)
    console.log('fetch playlist result', result)
    return await result
}

export async function fetchTopSongs() {
    const url = "https://api.spotify.com/v1/me/top/tracks"
    const result = await sendSpotifyRequest(url)
    return await result;
  }

// export async function fetchPlaylists() {
//     const token = await sendSpotifyRequest.checkSpotifyToken()
//     const result = await fetch("https://api.spotify.com/v1/me/playlists", {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     return await result.json();
// }