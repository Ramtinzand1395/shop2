import React , {createContext, useEffect, useState} from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const AuthContext = createContext()
const {Provider} = AuthContext

const AuthProvider = ({children}) => {
    const [authState , setAuthState] = useState({});

const router  = useRouter()
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const {data} = await axios.get("/api/auth/authenticate")
                if(data.token){
                    const user = JSON.parse(window.localStorage.getItem("decode"));
                    const {data:userdata} = await axios.get(`/api/user/${user.email}`)
                        setAuthState({token:data.token , user: userdata});
                        window.localStorage.setItem("decode" , JSON.stringify(userdata) )
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            fetchData()
        },[authState]);

        const logout = ()=>{
            const {status} = axios.get("/api/auth/logout");
            toast.warning("خروج با موفقیت انجام شد.")
            setAuthState({})
            window.localStorage.removeItem("decode")
            router.push('/')
          };

    const isAuthenticated = () => {
        if(authState.token){
            return true;
        }else{
            return false;
        }
    }
    return(
        <Provider
        value={{
            authState,
            isAuthenticated,
            setAuthNewState : (value) => setAuthState(value),
            logout,
        }}
        >
        {children}
        </Provider>
    )
}

export {
    AuthProvider , AuthContext
}