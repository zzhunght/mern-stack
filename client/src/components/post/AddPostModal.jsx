import React, { useContext, useState } from 'react'
import { Modal , Form , Button } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

function AddPostModal(id) {
    
    //GLOBAL STATE
    const{showAddPostModal,setShowAddPostModal,addPost} = useContext(PostContext)

    // LOCAL STATE
    const [post , setPost] = useState({
        title:'',
        description:'',
        url:'',
        status:'TO LEARN'
    })
    const {title, description, url, status} = post

    const FormSubmit = async (e) =>{
        e.preventDefault()
        const res = await addPost(post)
        if(res.success){
            setShowAddPostModal(false)
            setPost({
                title:'',
                description:'',
                url:'',
                status:'TO LEARN'
            })
        }
        console.log('res',res)
    }

    const handelfromchange = e => setPost({
        ...post,
        [e.target.name] : e.target.value
    })


    const hideModal = () => {
        setShowAddPostModal(false)

    }
    return (
        <Modal
         show={showAddPostModal} 
         onHide={hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title as='h4'>
                    What do you want to learn about ?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={FormSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                         name="title" 
                         type="text" 
                         placeholder="Title" 
                         required 
                         aria-describedby="title-help" 
                         value={title}
                         onChange={handelfromchange}
                        />
                        <Form.Text id="title-help" muted> Required </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                         name="description" 
                         type="text" 
                         placeholder="Description" 
                         as='textarea' 
                         row={3} 
                         value={description}
                         onChange={handelfromchange}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                         name="url" 
                         type="text" 
                         placeholder="URL TUTORIAL" 
                         value={url}
                         onChange={handelfromchange}

                        />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Select
                         aria-label="Default select example" 
                         name="status" 
                         value={status}
                         onChange={handelfromchange}
                         required={true}

                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEANED">LEANED</option>
                            <option value="LEARNING">LEARNING</option>
                        </Form.Select>
                    </Form.Group> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger"  onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
