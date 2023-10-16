import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { getUser } from "../../utilities/users-service";
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import TopSongs from "../TopSongsPage/TopSongsPage";
import NavBar from "../../components/NavBar/NavBar";
import PlaylistsPage from "../PlaylistsPage/PlaylistsPage"
import SpotifyLoginPage from "../SpotifyLoginPage/SpotifyLoginPage";
import ProfileFormPage from "../ProfileFormPage/ProfileFormPage";
import ProfileShowPage from "../ProfileShowPage/ProfileShowPage";
import SongFeaturesPage from "../SongFeaturesPage/SongFeaturesPage";
import MatchesPage from "../MatchesPage/MatchesPage";
import PhotoUploadPage from "../PhotoUploadPage/PhotoUploadPage"


export default function App() {
  const [user, setUser] = useState(getUser()) //the initial value for the state is the return from the getUser function
  const [profile, setProfile] = useState({})
  return (
    <main className="App">
      {user ? 
        <>
          <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={ <HomePage profile={profile} setProfile={setProfile} /> } />
              <Route path="/playlists" element={ <PlaylistsPage /> } />
              <Route path="/spotifylogin" element={ <SpotifyLoginPage /> } />
              <Route path="/profile/create" element={ <ProfileFormPage /> } />
              {/* <Route path="/profile/photo/upload" element={ <PhotoUploadPage /> } /> */}
              <Route path="/profile" element={ <ProfileShowPage /> } />
              <Route path="/matches" element={ <MatchesPage /> } />
              <Route path="/top" element={ <TopSongs /> } />
              <Route path="/features" element={ <SongFeaturesPage /> } />
              <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
        : 
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
