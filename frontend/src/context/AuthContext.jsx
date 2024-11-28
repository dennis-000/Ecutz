import { createContext, useEffect, useReducer } from "react";

// Initial state setup with proper parsing and validation for localStorage values
const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Safely parse user data
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
};

// Create AuthContext
export const AuthContext = createContext(initialState);

// Reducer to handle login, logout, and other actions
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };
        case 'LOGOUT':
            // Remove data from localStorage upon logout
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            return {
                user: null,
                role: null,
                token: null
            };
        default:
            return state;
    }
};

// AuthContextProvider component to provide global state to children
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // useEffect to update localStorage whenever the state changes
    useEffect(() => {
        // Only update localStorage if the user data exists
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        }
        localStorage.setItem('token', state.token);
        localStorage.setItem('role', state.role);
    }, [state]); // Run when state changes

    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
