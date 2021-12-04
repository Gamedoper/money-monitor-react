import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuth } from "./useAuthContext";


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuth();



    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);


            if (!res) {
                setError("Error signing up");
                setIsPending(false);
                return;
            }

            await res.user.updateProfile({ displayName });

            // dispatch login function

            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }

        }
        catch (err) {

            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { error, isPending, signup };

}