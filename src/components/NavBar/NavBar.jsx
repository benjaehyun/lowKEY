import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"

export default function NavBar({user, setUser}) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <nav>
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/top">My Top Songs</Link>
            &nbsp;  &nbsp;
            <Link to="/matches">My Matches</Link>
            &nbsp;  &nbsp;
            <Link to="/profile">My Profile</Link>
            <br />
            <span> Welcome, {user.name} </span> 
            &nbsp;  &nbsp; <Link to='' onClick={handleLogOut}>Log Out </Link>
        </nav>
    )
}