import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as spotifyService from "../../utilities/spotify-service"

export default function TopSongs({ setProfile, profile}) {
  const [apiData, setApiData] = useState(null)


  useEffect(
      function() {
          async function getTopSongs() {
            try {
              const data = await spotifyService.requestUserTopSongs(profile.spotifyToken)
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
    <>
      <h2>Title: {item.name} </h2>
      <h3>Album: {item.album.name} </h3>
      Artists: {artistArr[idx].join(' ')}
      <p>ID: {item.id} </p>
    </>)
  // }

  return (
      <>
          <h1> Your Top 40 Songs </h1>
          <div>{apiData ? <> {songs} </>   : "Top Songs Not Retrieved" }</div>
      </>
  )
}