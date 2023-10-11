import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { getUser } from "../../utilities/users-service";
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/Homepage";
import TopSongs from "../TopSongs/TopSongs";
import NavBar from "../../components/NavBar/NavBar";


export default function App() {
  const [user, setUser] = useState(getUser()) //the initial value for the state is the return from the getUser function
  return (
    <main className="App">
      {user ? 
        <>
          <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              {/* <Route path="/top" element={ <TopSongs /> } /> */}
              <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
        : 
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

