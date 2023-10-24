import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import * as spotifyAPI from "../../utilities/spotify-api"
import * as playlistAPI from "../../utilities/playlist-api"
import { Card, Button } from "react-bootstrap"
import "./PlaylistsPage.css"


export default function TopSongs() {
  const [apiData, setApiData] = useState(null)


  useEffect(
    function() {
      async function getPlaylists() {
        try {
          const data = await spotifyAPI.fetchPlaylists()
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
    navigate('/features')
  }

  async function selectPlaylist(id) {
    console.log(id)
    const data = await spotifyAPI.fetchPlaylistSongs(id)
    await playlistAPI.createMyPlaylist(data)
    navigate('/features')
  }

  let playlists = apiData?.items?.map(function (item, idx) { 
    if (item.tracks.total >= 20) return (
      <Card className="m-4"> 
        <div key={idx} onClick={()=>selectPlaylist(item.id)} className="playlist-div">
          <Card.Body>
              <h2 className="playlist-title">Title: {item.name} </h2>
            </Card.Body>
        </div>
      </Card>
    ) 
})
playlists = playlists?.filter(x=>x)

  return (
    <main className="main-content">
          <h1> Pick One of Your Playlists or Use The Top 20 Songs From Your Spotify Profile</h1>
          <Button onClick={selectTopSongs}>Use My Top 20 Songs</Button>
          <div>{apiData ? <> {playlists} </>   : "Playlists Not Retrieved" }</div>
      </main>
  )
}