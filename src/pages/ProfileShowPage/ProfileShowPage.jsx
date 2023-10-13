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
                <h4> {profile.name}, {profile.age} </h4>
                <h5> About you: {profile.about} </h5>
                <h5> Genres you like: {profile.genres} </h5>
                <h5> Artists you like: {profile.artists} </h5>
                {/* <Link to={'/features'}>
                    <button> go to get spotify features </button>
                </Link> */}
            </div>
        </>

    )
}