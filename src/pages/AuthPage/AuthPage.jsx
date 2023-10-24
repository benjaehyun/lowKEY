import LogInForm from "../../components/LogInForm/LogInForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import "./AuthPage.css"

export default function AuthPage({setUser}) {
    return (
        <main className="auth-main">
            <h1>Login/Signup</h1>
            <SignUpForm setUser={setUser}/>
            <LogInForm setUser={setUser} /> 
        </main>
    )
}