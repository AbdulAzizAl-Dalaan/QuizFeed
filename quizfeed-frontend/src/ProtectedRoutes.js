import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const auth = {'token': true}

    return (
            auth.token ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoutes;