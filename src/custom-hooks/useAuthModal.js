import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useAuthModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleNavigateToAuth = () => {
        navigate("/auth"); 
    }

    return { isOpen, handleOpen, handleClose, handleNavigateToAuth };
}

export default useAuthModal;