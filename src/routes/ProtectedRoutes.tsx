import React from 'react'
import {useSelector} from 'react-redux';
import {Outlet, Navigate} from 'react-router';
import Login from '../components/Login';


const ProtectedRoutes = () => {
    const {loggedIn} = useSelector((state:any) => state.logIn);
    return loggedIn ? <Outlet/> : <Navigate to= '/login'/>
}

export default ProtectedRoutes