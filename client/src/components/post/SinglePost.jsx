import React, { useState } from 'react'
import { Row , Col ,Card, Badge , Button } from 'react-bootstrap'
import ActionsButton from './ActionsButton'

function SinglePost({post }) {
   

    return (   
        <>

            <Card
            className="shadow"  
            border={
                post.status ==='LEARNED' ? 'success' 
                : post.status === 'LEARNING' ? 'warning' : 'danger'
            }
            >
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                <p className="post-title">{post.title}</p>
                                <Badge
                                pill 
                                bg={
                                    post.status ==='LEARNED' ? 'success' 
                                    : post.status === 'LEARNING' ? 'warning' : 'danger'
                                }
                                >
                                    {post.status}
                                </Badge>
                            </Col>    
                            <Col className="text-right">
                                <ActionsButton  post={post}/>
                            </Col>
                        </Row>    
                    </Card.Title>    
                    <Card.Text>
                        {post.description}
                    </Card.Text>
                </Card.Body>    
            </Card>
        </>
    )
}

export default SinglePost
