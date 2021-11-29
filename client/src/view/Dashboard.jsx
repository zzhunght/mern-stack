import React , { useContext , useEffect }from 'react'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import {Spinner , Button , Card, Row ,Col } from 'react-bootstrap'
import SinglePost from '../components/post/SinglePost'
import AddPostModal from '../components/post/AddPostModal'
import modalbtn from '../assets/plus-circle-fill.svg'
import UpdatePostModal from '../components/post/UpdatePostModal'


function Dashboard() {
    const { authState :{user:{username}}} = useContext(AuthContext)
    const {postState:{ post, posts ,postLoading},getPosts,setShowAddPostModal,ShowUpdatePostModal} = useContext(PostContext)

    useEffect(() => getPosts(),[])
    
    let body;

    if(postLoading){
        body =(
            <>
                <div className="spinner-container">
                    <Spinner animation="border" variant="info" />
                </div>
            </>
        )
    } else if(posts.length === 0) {
        body = (
           <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'> Hi! {username} </Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to learnIt</Card.Title>
                        <Card.Text>
                            Click the button below to learn
                        </Card.Text>
                        <Button variant="primary" onClick={()=>setShowAddPostModal(true)}>
                            Learn It
                        </Button>
                    </Card.Body>
                </Card>
           </> 
        )

    }
    else{
        body = (
            <>  
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    { posts.map(post =>(
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
                <Button className="btn-floating" onClick={()=>setShowAddPostModal(true)}>
                    <img  alt='' src={modalbtn} height="60" width="60" />
                </Button>
            </>
        )
    }

    return (
        <div>
            {body}
            <AddPostModal />
            
            { post !== null  && <UpdatePostModal  /> }
        </div>
    )
}

export default Dashboard
