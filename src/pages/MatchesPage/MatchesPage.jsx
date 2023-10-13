import { useEffect, useState } from "react"
import * as profilesAPI from "../../utilities/profiles-api"
import MatchCard from "../../components/MatchCard/MatchCard"


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
                {match.name} , {match.age}
            </div>
        )
    })

    return (
        <>
            { hasMatches ?
            <>
                <aside>
                    {matchList}
                </aside>
                { activeIdx !== null ? 
                    <MatchCard matchProfile={matches[activeIdx]} /> 
                    : 
                    <p>No Match Selected</p>
                }
            </>
            : 
            <>
                <p>No matches yet keep swiping!</p>
            </>

            }
        </>
    ) 
}