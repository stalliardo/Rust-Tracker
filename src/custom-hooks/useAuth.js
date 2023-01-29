import { useSelector } from 'react-redux'

const useAuth = () => {
    const user = useSelector(state => state.user.data);
    const isAuthenticated = user !== null;

    if(isAuthenticated) {
        const { fullName, firstName, lastName, username, id } = user;
        return { isAuthenticated, fullName, firstName, lastName, username, id };
    } else {
        return isAuthenticated;
    }
}

export default useAuth