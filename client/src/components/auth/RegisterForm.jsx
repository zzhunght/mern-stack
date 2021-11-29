import { Form , Button } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
function RegisterForm() {
    
         //layhaml ogin tu authContext
    // contexts
    const {RegisterUser} = useContext(AuthContext)

    //router 
    const history = useHistory()


    //local state
    const [alert,setAlert] = useState(null)
    const [registerForm,setRegisterForm] = useState({
        username:'',
        password:'',
        confirmPassword:'',
    })

    const {username,password,confirmPassword} = registerForm
    const onChangeForm = e =>{
        setRegisterForm({
            ...registerForm,
            [e.target.name] : e.target.value
        })

    }
    const register = async e => {
        e.preventDefault()
        if(password !== confirmPassword){
            setAlert({
                type:'danger',
                message:"password does not match",
            })

            setTimeout(() =>{
                setAlert(null)
            },3000)
            return
        }
        try {
            const registerData = await RegisterUser(registerForm)
            if(registerData.success) {
                history.push('/dashboard')
            } else {
                setAlert({
                    type:'danger',
                    message: registerData.message
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
        <Form onSubmit={register}>
            <Form.Group>
                <Form.Control
                 className="form-control" 
                 name="username" 
                 type="text" 
                 placeholder="Username"
                 value={username}
                 required
                 onChange={onChangeForm}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                 className="form-control" 
                 name="password" 
                 type="password" 
                 placeholder="Password"
                 value={password}
                 required
                 onChange={onChangeForm}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                 className="form-control" 
                 name="confirmPassword" 
                 type="password" 
                 placeholder="Confirm Password" 
                 required
                 onChange={onChangeForm}
                 value={confirmPassword}
                />
            </Form.Group>
            <Button className="btn" type="submit" variant="success" size="sm" >
                Register
            </Button>
        </Form>
        <p>
            Have an account ?
            <Link to='/login'>
                <Button className="btn" variant="info" size="sm" >
                    Login       
                </Button> 
            </Link>
        </p>
        </>
    )
}

export default RegisterForm
