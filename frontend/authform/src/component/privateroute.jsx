import React, { useEffect } from 'react'
import { Outlet, redirect } from 'react-router-dom';
import { Signup } from './signup';
import { Signin } from './SignIn';

export const Privateroute = () => {
    const isAuthenticated = document.cookie;
    
    return (
        isAuthenticated ? <Outlet/> : <Signin/>
    )
}
