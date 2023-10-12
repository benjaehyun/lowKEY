import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import * as spotifyAPI from "../../utilities/spotify-api"
import * as playlistAPI from "../../utilities/playlist-api"


export default function TopSongs({ }) {
  const [apiData, setApiData] = useState(null)


  useEffect(
    function() {
      async function getPlaylists() {
        try {
          const data = await spotifyAPI.fetchPlaylists()
          console.log('data:', data)
          setApiData(data)
        } catch(err) {
          console.log(err)
        }
      }
      getPlaylists()     
    }, [])
    
  const navigate = useNavigate()

  async function selectTopSongs () {
    const data = await spotifyAPI.fetchTopSongs()
    await playlistAPI.createTopPlaylist(data)
    navigate('/profile')
  }

  async function selectPlaylist(id) {
    console.log(id)
    const data = await spotifyAPI.fetchPlaylistSongs(id)
    await playlistAPI.createMyPlaylist(data)
    navigate('/profile')
  }

  const playlists = apiData?.items?.map((item, idx) => 
    <div key={idx} onClick={()=>selectPlaylist(item.id)} className="playlist-div">
      <h2>Title: {item.name} </h2>
      <h3>ID: {item.id} </h3>
    </div>
  )

  return (
      <>
          <h1> Pick One of Your Playlists or Use The Top 20 Songs In Your Profile</h1>
          <button onClick={selectTopSongs}>Use My Top 20 Songs</button>
          <div>{apiData ? <> {playlists} </>   : "Playlists Not Retrieved" }</div>
      </>
  )
}