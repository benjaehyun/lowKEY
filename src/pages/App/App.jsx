import {useState} from "react"
import { Routes, Route } from "react-router-dom"
import { getUser } from "../../utilities/users-service";
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import Homepage from "../Homepage/Homepage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import SpotifyLoginPage from "../SpotifyLoginPage/SpotifyLoginPage";
import CallbackPage from "../CallbackPage/CallbackPage"
import GetTokenPage from "../GetTokenPage/GetTokenPage";

export default function App() {
  const [user, setUser] = useState(getUser()) //the initial value for the state is the return from the getUser function

  return (
    <main className="App">
      {user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={ <Homepage user={user}/> } />
            <Route path="/callback" element={ <CallbackPage user={user} /> } />
            <Route path="/get-access-token" element={ <GetTokenPage user={user} /> } />
            {/* <Route path="/callback" element={ <Homepage user={user} /> } />  */}
            <Route path="/orders" element={ <OrderHistoryPage /> } />
          </Routes>
        </>
        : 
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

