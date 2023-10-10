import {useEffect, useState} from "react"
import { Routes, Route } from "react-router-dom"
import { getUser } from "../../utilities/users-service";
import * as profilesAPI from "../../utilities/profiles-api";
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import NavBar from "../../components/NavBar/NavBar";
import SpotifyLoginPage from "../SpotifyLoginPage/SpotifyLoginPage";


export default function App() {
  const [user, setUser] = useState(getUser()) //the initial value for the state is the return from the getUser function
  const [profile, setProfile] = useState({}) //the initial value for the state is the return from the getUser function


  return (
    <main className="App">
      {user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          {console.log(`app profile: ${profile}`)}
          
          { profile.spotifyToken ? // user is not being updated in the token because its being set back when you login, in the token. the token is being set before you save the spotify token so that's not being reflected until you logout and log back in 
            <>
              <Routes>
                <Route path="/" element={ <HomePage profile={profile}/> } />
              </Routes>
            </>
          : 
          <SpotifyLoginPage user={user} setUser={setUser} setProfile={setProfile} />
          }
        </>
        : 
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

