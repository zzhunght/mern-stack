import { useReducer , createContext, useEffect}  from 'react'
import axios from 'axios'
import {apiUrl ,LOCAL_STORAGE_TOKEN_NAME} from './constants'
import { authReducer } from '../reducers/authreducer'
import setAuthToken from '../untils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        //state cuar authReducer
		authLoading: true,
		isAuthenticated: false,
		user: null
	})
    //load user

    const LoadUser = async () =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success){
                dispatch({type:'SET_AUTH',payload:{
                    isAuthenticated:true,
                    user:response.data.user
                }})
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type:'SET_AUTH',payload:{
                
                isAuthenticated: false,
                user: null
            }})
        }

    }
    const logOutUser = ( ) =>{
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({type:'SET_AUTH',payload:{
            isAuthenticated: false,
		    user: null
        }})
    }

    //dang nhap
    const LoginUser = async ( userForm ) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`,userForm)
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,res.data.accessToken)
            }
            await LoadUser()
            return res.data
        } catch (error) {
            if(error.response.data){
                return error.response.data
            }
            else {
                return {
                    success : false,
                    error : error.message
                }
            }
        }
    }
    const RegisterUser = async ( userForm ) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`,userForm)
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,res.data.accessToken)
            }
            await LoadUser()
            return res.data
        } catch (error) {
            if(error.response.data){
                return error.response.data
            }
            else {
                return {
                    success : false,
                    error : error.message
                }
            }
        }
    }

    useEffect(() => {
        LoadUser()
    },[])
    const authContextData = {LoginUser,RegisterUser,logOutUser,authState}


    return (

        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider