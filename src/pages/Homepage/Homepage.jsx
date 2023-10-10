import SpotifyLoginPage from "../SpotifyLoginPage/SpotifyLoginPage"
import ProfileInfoPage from "../ProfileInfoPage/ProfileInfoPage"
import { getUser } from "../../utilities/users-service";

export default function HomePage({user, setUser, profile}) {
    console.log(`homepage profile: ${profile}`)
    return (
        <>
            <div>
                <ProfileInfoPage profile={profile} />
                <h1>Welcome to the Lowkey</h1>
                <h3>The New Way to a match based on your taste </h3> 
            </div>
           
        </>
    )
}