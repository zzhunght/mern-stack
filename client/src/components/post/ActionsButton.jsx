import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext} from '../../contexts/PostContext'
function ActionsButton({post}) {
    const {deletePost,findPost,setShowUpdatePostModal} = useContext(PostContext)
    const choosePost = id =>{
        
    }
    return (
        <>
            <Button className="post-button" href={post.url} target="_blank">
                <img src={playIcon} alt="play-icon" height="32" width="32" />    
            </Button> 
            <Button className="post-button" onClick={()=>{
                findPost(post._id)
                setShowUpdatePostModal(true)
            }} >
                <img src={editIcon} alt="edit-icon" height="24" width="24" />    
            </Button> 
            <Button  className="post-button" onClick={()=>deletePost(post._id)}>
                <img src={deleteIcon} alt="" height="24" width="24" />    
            </Button> 
        </>
    )
}

export default ActionsButton
