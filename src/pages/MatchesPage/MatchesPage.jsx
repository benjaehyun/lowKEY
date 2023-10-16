import { useEffect, useState } from "react"
import * as profilesAPI from "../../utilities/profiles-api"
import MatchCard from "../../components/MatchCard/MatchCard"
import ChatWindow from "../../components/ChatWindow/ChatWindow"
import "./MatchesPage.css"


export default function MatchesPage() {
    const [matches, setMatches] = useState([]) 
    const [activeIdx, setActiveIdx] = useState(null)
    const [hasMatches, setHasMatches] = useState(false)
    

    useEffect(
        function() {
          async function getMatches() {
            try {
              const apiMatches = await profilesAPI.fetchMatches()
              setMatches(apiMatches)
              if (apiMatches.length) setHasMatches(true)
              if (!apiMatches.length) setHasMatches(false)
            } catch(err) {
              console.log(err)
            }
          }
          getMatches()     
        }, [])


    function selectMatch(idx) {
        setActiveIdx(idx)
    }
    const matchList = matches?.map(function (match, idx){
        return (
            <div onClick={() => selectMatch(idx)} key={idx}>
                <h5>{match.name} , {match.age}</h5>
            </div>
        )
    })

    return (
        <>
            { hasMatches ?
            <>
                <aside className="match-list">
                    {matchList}
                </aside>
                <main className="main-match">
                { activeIdx !== null ? 
                    <>
                        <ChatWindow matchProfile={matches[activeIdx]} /> 
                        <MatchCard matchProfile={matches[activeIdx]} /> 
                    </>
                    : 
                    <p>No Match Selected</p>
                }
                </main>
            </>
            : 
            <>
                <p>No matches yet keep swiping!</p>
            </>

            }
        </>
    ) 
}