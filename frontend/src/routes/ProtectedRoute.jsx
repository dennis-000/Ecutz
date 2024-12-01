/* eslint-disable react/prop-types */
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = useContext(AuthContext);

    // If token or role is undefined, show a loading state to avoid premature redirection
    if (token === undefined || role === undefined) {
        return <div>Loading...</div>;
    }
    console.log(token, role)

    // Determine access based on role
    const isAllowed = token && allowedRoles.includes(role);

    return isAllowed ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
