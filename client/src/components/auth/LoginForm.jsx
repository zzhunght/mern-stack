import React, { useContext, useState } from 'react'
import { Form , Button } from 'react-bootstrap'
import { Link , useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'



function LoginForm() {

    //layhaml ogin tu authContext
    // contexts
    const {LoginUser} = useContext(AuthContext)

    //router 
    const history = useHistory()


    //local state
    const [alert,setAlert] = useState(null)
    const [loginForm,setLoginForm] = useState({
        username:'',
        password:'',
    })

    const onChangeForm = e =>{
        setLoginForm({
            ...loginForm,
            [e.target.name] : e.target.value
        })

    }
    const login = async e => {
        e.preventDefault()
        try {
            const loginData = await LoginUser(loginForm)
            if(loginData.success) {
                // history.push('/dashboard')
                
            } else {
                setAlert({
                    type:'danger',
                    message: loginData.message
                })
                setTimeout(() =>{
                    setAlert(null)
                },3000)
            }
        } catch (error) {

            console.log('error-login',error.message)
        }
    }
    return (
        <>
        <AlertMessage info={alert} />
        <Form className="my-4" onSubmit={login}>
            <Form.Group>
                <Form.Control
                 name="username" 
                 type="text" 
                 placeholder="Username" 
                 required
                 className="form-control"
                 onChange={onChangeForm}
                 value={loginForm.username}
                 />
            </Form.Group>
            <Form.Group>
                <Form.Control
                 name="password" 
                 type="password" 
                 placeholder="Password" 
                 required
                 className="form-control"
                 onChange={onChangeForm}
                 value={loginForm.password}
                />
            </Form.Group>
            <Button className="btn" type="submit" variant="success" size="sm">
                Login 
            </Button>
        </Form>
        <p>
            Don't have an account ?
            <Link to='/register' >
                <Button className="btn" variant="info" size="sm" >
                    Register       
                </Button> 
            </Link>    
        </p>
        </>
    )
}

export default LoginForm
