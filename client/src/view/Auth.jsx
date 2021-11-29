import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'

function Auth({AuthRoute}) {

    const {authState} = useContext(AuthContext)
    const {authLoading , isAuthenticated} = authState
    let body
    if(authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    else if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    else{
        body = ( 
            <>
                { AuthRoute === 'login' && <LoginForm /> }
                { AuthRoute === 'register' && <RegisterForm /> }
            </>
        )
    }
   

    return (
        <div className="landing">
           <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn It</h1>
                    <h4> Keep track of what you're doing'</h4>
                    {body}
                </div>
            </div> 
        </div>
    )
}

export default Auth
