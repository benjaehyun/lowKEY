import {useState, useEffect} from 'react'
import SpotifyProfileInfo from "../../components/SpotifyProfileInfo/SpotifyProfileInfo"
import * as profileAPI from "../../utilities/profiles-api"
import TopSongs from '../TopSongsPage/TopSongsPage'
import ProfileSwipeCard from '../../components/ProfileSwipeCard/ProfileSwipeCard'

export default function HomePage({profile, setProfile}) {

    useEffect(function () {
        async function getApiProfile() {
            const apiProfile = await profileAPI.getProfile()
            setProfile({...apiProfile})
        }
        getApiProfile()
    }, [])
    
    return (
        <>
            { profile ? 
            <div>
                <h1>Welcome to the lowKEY</h1>
                <h3>The New Way to a match based on your taste in music </h3> 
                <h4> {profile.name}, {profile.age} </h4>
                <h5> About you: {profile.about} </h5>
                <h5> Genres you like: {profile.genres} </h5>
                <h5> Artists you like: {profile.artists} </h5>
                <ProfileSwipeCard profile={profile} />
                {/* <SpotifyProfileInfo profile={profile} /> */}
                {/* <TopSongs profile={profile} /> */}
            </div>
            :  
            'no bueno'
            
            }
           
        </>

    )
}