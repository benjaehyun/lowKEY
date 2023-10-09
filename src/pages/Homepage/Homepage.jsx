import SpotifyLoginPage from "../SpotifyLoginPage/SpotifyLoginPage"

export default function Homepage({user}) {
    return (
        <>
        { user.spotifyToken ? 
            <div>
                <h1>Welcome to the Lowkey</h1>
                <h3>The New Way to a match based on your taste </h3> 
            </div>
            : 
            <SpotifyLoginPage user={user}/> 
        }
        </>
    )
}