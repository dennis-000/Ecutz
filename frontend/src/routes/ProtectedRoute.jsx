/* eslint-disable react/prop-types */
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = useContext(AuthContext);



    // Debugging token and role
    console.log('ProtectedRoute:', { token, role, allowedRoles });

    // Show a loading state if token or role is not yet defined
    if (token === undefined || role === undefined) {
        return <div>Loading...</div>;
    }



    // Check if the user is allowed
    const isAllowed = token && allowedRoles.includes(role);

    const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;

    return accessibleRoute
};

export default ProtectedRoute;
