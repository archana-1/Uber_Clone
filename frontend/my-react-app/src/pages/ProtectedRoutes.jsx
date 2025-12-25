import React, {useEffect }from 'react';
import {useNavigate} from 'react-router-dom';

function ProtectedRoutes({children}){


    const navigate = useNavigate();
    
    const user = localStorage.getItem('current_user')
    const isAuthenticated = user? localStorage.getItem(`${user}_accesstoken`): null;
    
    useEffect(() => {
        if( !isAuthenticated) navigate('/login')
    }, []);
    
    return (children)
}
export default ProtectedRoutes;