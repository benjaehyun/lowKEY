import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import * as spotifyAPI from "../../utilities/spotify-api"
import * as playlistAPI from "../../utilities/playlist-api"


export default function SongFeaturesPage ({ }) {
  const [apiData, setApiData] = useState(null)
  const [playlist, setPlaylist] = useState({})

  const navigate=useNavigate()
  useEffect(
    function() {
      async function getPlaylists() {
        try {
          const apiPlaylist = await playlistAPI.getPlaylist()
          const features = await spotifyAPI.fetchSongFeatures(apiPlaylist.songId)
          const backPlaylist = await playlistAPI.addFeatures(features)
          setPlaylist(backPlaylist)
        } catch(err) {
          console.log(err)
        }
      }
      getPlaylists()     
      navigate('/')
    }, [])
  
  

  return (
      <>
          <h1>testing song features</h1>
          
          
      </>
  )
}