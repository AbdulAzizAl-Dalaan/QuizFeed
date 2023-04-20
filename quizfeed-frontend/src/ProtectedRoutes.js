import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    /* 
       This auth's token will be set to true if the 
       user is logged in, and false if not.
     */
    const auth = {'token': true} 

    return (
            auth.token ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoutes;