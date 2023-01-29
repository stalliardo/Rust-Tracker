import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.data);
    const navigate = useNavigate();

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleNavigateToAuth = () => {
        navigate("/"); 
    }

    return { isOpen, handleOpen, handleClose, handleNavigateToAuth };
}



export default useAuthModal