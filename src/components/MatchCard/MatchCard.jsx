import ChatBox from "../ChatBox/ChatBox";


export default function MatchCard({matchProfile}) {
    

    return (
        <div>
            <h2>{matchProfile.name}, {matchProfile.age}</h2>
            <h4>About: {matchProfile.about}</h4>
            <h4>Artists They Like: {matchProfile.artists}</h4>
            <h4>Genres They Like: {matchProfile.genres}</h4>
            <ChatBox matchProfile={matchProfile}/>
        </div>
    )
}