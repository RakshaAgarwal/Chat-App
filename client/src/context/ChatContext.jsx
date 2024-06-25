import {createContext, useEffect, useState} from 'react'
import { baseUrl, postRequest , getRequest} from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider=({children, user})=>{
    const [userChats, setUserChats] = useState(null)
    const [chatError, setChatError] = useState(null)
    const [isChatLoading, setChatLoading] = useState(false)

    useEffect(()=>{
        const getUserChats = async()=>{

        }
        getUserChats()

    }, [user])

    return <ChatContext.Provider value={{userChats, chatError, isChatLoading}}>{children}</ChatContext.Provider>
}