import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as spotifyAPI from "../../utilities/spotify-api"


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
    

    const playlists = apiData?.items?.map((item, idx) => 
      <div key={idx}>
        <h2>Title: {item.name} </h2>
        <h3>ID: {item.id} </h3>
      </div>
    )

  return (
      <>
          <h1> Your Playlists </h1>
          <div>{apiData ? <> {playlists} </>   : "Playlists Not Retrieved" }</div>
      </>
  )
}