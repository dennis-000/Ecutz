import { createContext, useEffect, useReducer } from "react";

// Initial state setup
const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
                token: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };
        case 'LOGOUT':
            localStorage.clear(); // Clear all localStorage items
            return {
                user: null,
                role: null,
                token: null,
            };
        default:
            return state;
    }
};

// AuthContextProvider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.token) {
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('role', state.role);
            localStorage.setItem('token', state.token);
        }
    }, [state]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
