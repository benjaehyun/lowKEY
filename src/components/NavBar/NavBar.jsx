import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"
import "./NavBar.css"

export default function NavBar({user, setUser}) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <nav>
            <Link to="/">
                <img src="/app-logo.png" alt="" height={'100px'}/>
            </Link>
            <h5> Welcome, {user.name} </h5> 
            <Link to="/">Home</Link>
            &nbsp;  &nbsp;
            <Link to="/matches">My Matches</Link>
            &nbsp;  &nbsp;
            <Link to="/profile">My Profile</Link>
            &nbsp;  &nbsp;
            <Link to="/top">My Top Songs</Link>
            &nbsp;  &nbsp; 
            <Link to='' onClick={handleLogOut}>Log Out </Link>
        </nav>
    )
}