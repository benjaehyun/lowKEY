import {useState, useEffect} from 'react'
import SpotifyProfileInfo from "../../components/SpotifyProfileInfo/SpotifyProfileInfo"
import * as profileAPI from "../../utilities/profiles-api"
import TopSongs from '../TopSongsPage/TopSongsPage'

export default function HomePage({profile, setProfile}) {

    useEffect(function () {
        async function getApiProfile() {
            const apiProfile = await profileAPI.getProfile()
            setProfile({...apiProfile})
        }
        getApiProfile()
    }, [])
    
    console.log(`homepage profile: ${JSON.stringify(profile)}`)
    return (
        <>
            { profile?.spotifyToken ? 
            // user is not being updated in the token because its being set back when you login, in the token. the token is being set before you save the spotify token so that's not being reflected until you logout and log back in 
            <div>
                <h1>Welcome to the lowKEY</h1>
                <h3>The New Way to a match based on your taste in music </h3> 
                {profile.name}
                {profile.spotifyToken.token}
                <SpotifyProfileInfo profile={profile} />
                <TopSongs profile={profile} />
            </div>
            :  
            'no bueno'
            
            }
           
        </>

    )
}