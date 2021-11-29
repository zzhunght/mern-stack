import axios from "axios";
import { useReducer, createContext, useState} from "react";
import {postReducer} from "../reducers/postreducer"
import { apiUrl } from "./constants";

export const PostContext = createContext()

const PostContextProvider = ( {children}) =>{
    const [postState, dispatch] = useReducer(postReducer,{
        post:null,
        posts:[],
        postLoading:true,
    })

    const [showAddPostModal,setShowAddPostModal] = useState(false)
    const [showUpdatePostModal,setShowUpdatePostModal] = useState(false)

    
    //find post when button update clicked
    const findPost = id => {
        const post = postState.posts.filter(post => post._id === id)
        dispatch({type:'FIND_POST', payload:post})
    }


    //get all post
    const getPosts = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success){
                dispatch({
                    type:"POSTS_LOADED_SUCCESS",
                    payload:response.data.posts
                })
            }
        } catch (error) {
            dispatch({type:"POSTS_LOADED_FAIL"} )
        }

    }
    // delete post 
    const deletePost = async (id) =>{
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`)
            if(response.data.success){
                // getPosts()
                dispatch({type:'DELETE_POST',payload:id})
            }
        } catch (error) {
            return error.response.data ? error.response.data :  {success: false,message:'server error'}

        }
    }

    //updatePost
    const updatePost = async (updatedPost) =>{
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`,updatedPost)
            
            if(response.data.success){
                dispatch({type:'UPDATE_POST',payload:updatedPost})
                return response.data
            }
            
        } catch (error) {
            return error.response.data ? error.response.data :  {success: false,message:'server error'}
            
        }        

    }

    // add post
    const addPost = async (form) =>{
       try {
        const response = await axios.post(`${apiUrl}/posts`,form)
        if(response.data.success){
            // getPosts()
            dispatch({type:'ADD_POST',payload:form})
            return response.data
        }
       } catch (error) {
        return error.response.data ? error.response.data :  {success: false,message:'server error'}

       }

    }

    const postContextData = {postState,getPosts,deletePost,showAddPostModal,setShowAddPostModal,showUpdatePostModal,setShowUpdatePostModal ,addPost,updatePost,findPost}
    return(
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>

    )
}

export default PostContextProvider