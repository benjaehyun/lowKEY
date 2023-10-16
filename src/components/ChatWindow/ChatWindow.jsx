import { useEffect, useState } from 'react'
import io  from 'socket.io-client'
import "./ChatWindow.css"
import * as profilesAPI from "../../utilities/profiles-api"
import * as socketModule from "./socket"

export default function MatchCard({matchProfile}) {
    // const socket = io.connect("http://localhost:3001") 
    // const socket = io("http://localhost:3001") 
    const [data, setData] = useState({})
    const [message, setMessage] = useState([])
    const [chatroomState, setChatroomState] = useState([])
    const [listening, setListening] = useState(0)
    


    useEffect( ()=> {
       async function getChatRoom() {
            const apiData = await profilesAPI.fetchChatRoom(matchProfile) // get whole chatroom toi render all of the prev msgs 
            setData(apiData)
            setChatroomState(apiData.chatroom.messages)
            console.log(apiData)
            return apiData
            //could have done socket.on for the msg thats getting msgs 
        }
        getChatRoom()
        // console.log(data)
        // console.log(apiData)
        // socket.on("connect" ()
        //  => {

        // }
        // )
        // socket.on('receive-message', (socketMessage) => {
        //     setChatroomState([...chatroomState, socketMessage])
        //     console.log(chatroomState)
        // })
        socketModule.passSetChatroomState(setChatroomState)
        // socketModule.joinRoom(apiData.chatroom?._id)
    },[matchProfile]) 

    useEffect(function () 
    {
        socketModule.joinRoom(data.chatroom?._id)
    }, [data])


    //api call for previous messages between two users in backend

    function handleChange(e){
        setMessage(e.target.value)
    }

    // function handleSubmit() {
    //     console.log(chatroom)
    //     socket.emit('message', {
    //         'message': message, 
    //         receiver: matchProfile._id, 
    //         sender: data.currentProfile.name, 
    //         chatroomId: data.chatroom._id
    //     })
    //     setListening(listening+1)
    // }
    function handleSubmit() {
        // console.log(chatroom)
        const newMessage = {
            content: message, 
            sender: data.currentProfile.name
        }
        socketModule.sendChat(newMessage, chatroomState, data.chatroom._id)
        setMessage('')
        // socket.emit('send-message', {
            // content: message, 
            // receiver: matchProfile._id, 
            // sender: data.currentProfile.name, 
            // chatroomId: data.chatroom._id
        // })
    }

    // const messagesList = chatroomState?.map((message, idx) => 
    // {
    //     return (
    //         <>
    //             <p key={idx}>{message.content}</p>
    //             { message.sender ? <small>{message.sender}</small> : '' }
    //         </>
    //     )
    // }
    // )

    return (
        <>
            <div>
                {chatroomState?.map((message, idx) => 
    {
        return (
            <>
                <p key={idx}>{message.content}</p>
                { message.sender ? <small>{message.sender}</small> : '' }
            </>
        )
    }
    )}
            </div>
            <div>
                <input type="text" onChange={handleChange} value={message}/>
                <button onClick={handleSubmit}>send </button>
            </div>
        </>
    )
}