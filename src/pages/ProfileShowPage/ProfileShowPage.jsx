import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import * as profileAPI from "../../utilities/profiles-api"

export default function ProfileShowPage({}) {
    const [profile, setProfile] = useState({})
    useEffect(function () {
        async function getApiProfile() {
            const apiProfile = await profileAPI.getProfile()
            setProfile({...apiProfile})
        }
        getApiProfile()
    }, [])
    
    return (
        <>
            <div>
                <h1>Profile Show Page</h1>
                {profile.name} <br />
                {profile.age} <br />
                {profile.about} <br />
                {profile.genres} <br />
                {profile.artists} <br />
                {profile.spotifyToken.token}
                <Link to={'/features'}>
                    <button> go to get spotify features </button>
                </Link>
            </div>
        </>

    )
}