import sendSpotifyRequest from "./send-spotify-request";

export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
}

export async function fetchPlaylists () {
    const url = 'https://api.spotify.com/v1/me/playlists?limit=50'
    const result = await sendSpotifyRequest(url)
    return await result
}
export async function fetchSongFeatures (idArr) {
    let url = 'https://api.spotify.com/v1/audio-features?'
    const args = `ids=${idArr.join('%2C')}`
    console.log('fetch url', url+args)
    const result = await sendSpotifyRequest(url, args)
    return await result
}

export async function fetchTopSongs() {
    const url = "https://api.spotify.com/v1/me/top/tracks"
    const result = await sendSpotifyRequest(url)
    return await result;
  }

export async function fetchPlaylistSongs(id) {
    const url = 'https://api.spotify.com/v1/playlists/'
    const args = `${id}/tracks?fields=items%28track%28album%28name%29%2Cartists%28name%29%2Cid%2Cname%29%29&limit=20&offset=0`
    const result = await sendSpotifyRequest(url, args)
    return await result
}