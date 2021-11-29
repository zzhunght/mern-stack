import React, { useContext } from 'react'
import {Navbar,Nav, Button} from 'react-bootstrap'
import learnItLogo from '../../assets/logo.svg'
import logOutLogo from '../../assets/logout.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

function NavbarMenu() {
    const {authState:{user},logOutUser} = useContext(AuthContext)

    const logout = () => logOutUser()
    console.log('user',user)
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-while'>
                <img
                 src={learnItLogo}
                 alt='logo'
                 height='32'
                 weight='32'
                 className='mr-2' 
                />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle  aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="nav-list">
                <Nav className="mr-auto">
                    <Nav.Link className='font-weight-bolder text-while' as={Link} to="/dashboard" >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-while' as={Link} to="/about" >
                        About
                    </Nav.Link>
                    
                </Nav>
                <Nav>
                    <Nav.Link className='font-weight-bolder text-while' disable >
                        Welcome {user.username}
                    </Nav.Link>
                    <Button className='font-weight-bolder text-while' variant="danger" onClick={logout} >
                        <img
                         src={logOutLogo}
                         alt="logout"
                         height='32'
                         weight='32'
                         className='mr-2'
                        />
                        Log Out
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
