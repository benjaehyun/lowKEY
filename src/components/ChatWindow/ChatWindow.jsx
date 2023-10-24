import { useEffect, useState } from 'react'

import "./ChatWindow.css"
import * as profilesAPI from "../../utilities/profiles-api"
import { Button } from 'react-bootstrap'
import * as socketModule from "./socket"

export default function MatchCard({matchProfile}) {
    const [data, setData] = useState({})
    const [message, setMessage] = useState([])
    const [chatroomState, setChatroomState] = useState([])

    


    useEffect( ()=> {
       async function getChatRoom() {
            const apiData = await profilesAPI.fetchChatRoom(matchProfile) // get whole chatroom toi render all of the prev msgs 
            setData(apiData)
            setChatroomState(apiData.chatroom.messages)
            console.log(apiData)
            return apiData
        }
        getChatRoom()

        socketModule.passSetChatroomState(setChatroomState)

    },[matchProfile]) 

    useEffect(function () 
    {
        socketModule.joinRoom(data.chatroom?._id)
    }, [data])




    function handleChange(e){
        setMessage(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault()
        const newMessage = {
            content: message, 
            sender: data.currentProfile.name
        }
        socketModule.sendChat(newMessage, chatroomState, data.chatroom._id)
        setMessage('')

    }



    return (
        <div className='chat-div'>
            <h2>Your Chat with {matchProfile.name}</h2>
            <div className='messages-div'>
                {chatroomState?.map((message, idx) =>   //please for the love of god, refactor this
    {
        return (
            <>
                { message.sender === data.currentProfile.name ? 
                    <div className='user-msg'>
                    <p key={idx}>{message.content}</p>
                </div>
                :
                <div className='match-msg'>
                    <p key={idx}>{message.content}</p>
                    { message.sender ? <small>-{message.sender}</small> : '' }
                </div>
                }
            </>
        )
    }
    )}
            </div>
            <form onSubmit={handleSubmit} className='input-div'> 
                <input type="text" onChange={handleChange} value={message} required/>
                <Button type='submit'> send </Button>
            </form>
        </div>
    )
}