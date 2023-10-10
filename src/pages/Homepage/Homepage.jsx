import {useState} from 'react'
import SpotifyLoginPage from "../SpotifyLoginPage/SpotifyLoginPage"
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"
import { getUser } from "../../utilities/users-service";

export default function HomePage({}) {
    const [profile, setProfile] = useState({})
    const [profileChange, setProfileChange] = useState(false)

    
    console.log(`homepage profile: ${profile}`)
    return (
        <>
            { profile?.spotifyToken ? // user is not being updated in the token because its being set back when you login, in the token. the token is being set before you save the spotify token so that's not being reflected until you logout and log back in 
            <div>
                <h1>Welcome to the lowKEY</h1>
                <h3>The New Way to a match based on your taste in music </h3> 
                <ProfileInfo profile={profile} />
            </div>
            : 
            <SpotifyLoginPage setProfile={setProfile} profile={profile} setProfileChange={setProfileChange}/>
            }
           
        </>

    )
}