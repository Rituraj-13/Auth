import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'

interface SecureRouteProps {
    element: React.ComponentType;
    [key: string]: any; // Allow additional props
}

const SecureRoute: React.FC<SecureRouteProps> = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const tokenWithoutBearer = token?.split(' ')[1];

    let tokenVerify;
    try {
        tokenVerify = jwt.verify(tokenWithoutBearer as string, process.env.SECRET_KEY as string);
    } catch (err) {
        console.error('Token verification failed', err);
    }

    if (!tokenVerify) {
        // If no token or token verification failed, redirect to sign-in page
        return <Navigate to="/signin" />;
    }

    // If token exists and is valid, render the protected component
    return <Component {...rest} />;
};

export default SecureRoute;
