import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext()
export const AuthContextProvider = ({ children })=>{
    const [user, setUser]=useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    useEffect(()=>{
        const user = localStorage.getItem('User')
        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = useCallback((info)=>{  
        setRegisterInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info)=>{  
        setLoginInfo(info)
    }, [])

    const registerUser = useCallback(async(e)=>{
     
        e.preventDefault();
        setRegisterLoading(true)
        setRegisterError(null)
       const res = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
       setRegisterLoading(false)
       if(res.error){
        return setRegisterError(res)
       }
       localStorage.setItem('User', JSON.stringify(res))
       setUser(res)
    }, [registerInfo])

    const loginUser = useCallback(async(e)=>{     
        e.preventDefault();
        setRegisterLoading(true)
        setRegisterError(null)
        const res = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        setRegisterLoading(false)
       if(res.error){
        return setRegisterError(res)
       }
       localStorage.setItem('User', JSON.stringify(res))
       setUser(res)
    }, [loginInfo])

    const logout = useCallback(()=>{
        localStorage.removeItem('User')
        setUser(null)
    }, [])
    return <AuthContext.Provider value={{user, registerInfo, loginInfo, updateRegisterInfo, updateLoginInfo, registerUser, loginUser, registerError, isRegisterLoading, logout}}>
             {children}
           </AuthContext.Provider>
}