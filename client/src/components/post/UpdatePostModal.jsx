import React, { useContext, useEffect, useState } from 'react'
import { Modal , Form , Button } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

function UpdatePostModal() {
    //GLOBAL STATE
    const{showUpdatePostModal,setShowUpdatePostModal,updatePost,postState:{post}} = useContext(PostContext)

    // LOCAL STATE
    const [postUpdate , setPostUpdate] = useState(post)
    const {title,description,url,status,_id} = postUpdate
    useEffect(()=>setPostUpdate(post),[post])
    console.log(postUpdate)
    const FormSubmit = async (e) =>{
        e.preventDefault()
        const res = await updatePost(postUpdate)
        if(res.success){
            setShowUpdatePostModal(false)
           
        }
        console.log('res',res)
    }

    const handelfromchange = e => setPostUpdate({
        ...postUpdate,
        [e.target.name] : e.target.value
    })


    const hideModal = () => {
        setShowUpdatePostModal(false)
        setPostUpdate(post)
    }
    return (
        <Modal
         show={showUpdatePostModal} 
         onHide={hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title as='h4'>
                    Update Post
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
                    <Form.Group>
                        <Form.Select
                         aria-label="Default select example" 
                         name="status" 
                         value={status}
                         onChange={handelfromchange}
                         required={true}

                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNED">LEARNED</option>
                            <option value="LEARNING">LEARNING</option>
                        </Form.Select>
                    </Form.Group>
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

export default UpdatePostModal
