import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as spotifyAPI from "../../utilities/spotify-api"
import * as spotifyRequest from "../../utilities/send-spotify-request"


export default function TopSongs({ setProfile, profile}) {
  const [apiData, setApiData] = useState(null)


  useEffect(
      function() {
          async function getTopSongs() {
            try {
              const data = await spotifyAPI.fetchTopSongs()
              console.log(`top songs data: ${data}`)
              setApiData(data)
            } catch(err) {
              console.log(err)
            }
          }
          getTopSongs()     
      }, [])
    
  // if (apiData) {
    let artistArr=[]
    apiData?.items?.forEach(function (item) {
      // item.artists.forEach(function (artist) {
        let tempArr = []
        item.artists.forEach((artist) => tempArr.push(artist.name))
        return artistArr.push(tempArr)
      // })
    })
    const songs = apiData?.items?.map((item, idx) => 
    <div key={idx}>
      <h2>Title: {item.name} </h2>
      <h3>Album: {item.album.name} </h3>
      Artists: {artistArr[idx].join(' ')}
      <p>ID: {item.id} </p>
    </div>)
  // }

  async function checkFunction () {
    const res = await spotifyRequest.checkSpotifyToken()
    console.log('check function res', res)
  }

  return (
      <>
          <button onClick={checkFunction}>Check Spotify Token</button>
          <h1> Your Top 40 Songs </h1>
          <div>{apiData ? <> {songs} </>   : "Top Songs Not Retrieved" }</div>
      </>
  )
}