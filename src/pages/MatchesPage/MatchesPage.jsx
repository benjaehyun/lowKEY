import { useEffect, useState } from "react"
import * as profilesAPI from "../../utilities/profiles-api"


export default function MatchesPage() {
    const [matchList, setMatchlist] = useState([]) 

    useEffect(
        function() {
          async function getMatches() {
            try {
              const matches = await profilesAPI.fetchMatches()
              setMatchlist(matches)
            } catch(err) {
              console.log(err)
            }
          }
          getMatches()     
        }, [])

    matchList?.map()

    return (
        <>
        </>
    ) 
}