import React, {useEffect} from 'react';
import LoginForm from '../components/LoginPageComponents/LoginForm/LoginForm';

const Login:React.FC = () => {
    useEffect(() => {
        document.title = 'Login';
    },[])
    return (
        <>
            <LoginForm />
        </>
    );
}

export default Login;