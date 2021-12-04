import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";


export const AuthContext = createContext();


export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case "AUTH_IS_READY":
            return {
                ...state,
                authIsReady: true,
                user: action.payload
            };

        default:
            return state;

    }
}


export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        authIsReady: false,
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user });
            unsub();
        })

    }, [])

    console.log('authcontext', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
