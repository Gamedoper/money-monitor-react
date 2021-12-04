import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuth } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const [isCancelled, setIsCancelled] = useState(false)



    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            // sign the user out
            await projectAuth.signOut()

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })


            if (!isCancelled) {
                setIsPending(false)
            }

            // update state
            setIsPending(false)
            setError(null)
        }
        catch (err) {
            if (!isCancelled) {
                setIsPending(false)
                setError(err)
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { logout, error, isPending }
}