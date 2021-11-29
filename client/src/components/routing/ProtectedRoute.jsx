import React, { useContext } from 'react'
import { Route , Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import NavbarMenu from '../layout/NavbarMenu'

function ProtectedRoute({component: Component,...rest}) {
    
    const { authState: { isAuthenticated , authLoading}} = useContext(AuthContext)

    if(authLoading){
        return <div className="loading">
            loading.....
        </div>
    }


    return (
        <>
            <Route {...rest}  render={
                props => isAuthenticated 
                ?
                (
                    <>
                        <NavbarMenu />
                        <Component {...props} {...rest} />
                    </>
                ) 
                :
                (
                    <Redirect to="/login" />
                )
            }/>
        </>
    )
}

export default ProtectedRoute
