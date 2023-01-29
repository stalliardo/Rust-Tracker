import React from 'react'
import { useSelector } from 'react-redux'

const useAuth = () => {
    const user = useSelector(state => state.user.data);
    const isAuthed = user !== null;

    return isAuthed;
}

export default useAuth