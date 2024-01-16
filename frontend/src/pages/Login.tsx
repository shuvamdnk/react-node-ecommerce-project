import React, {useEffect} from 'react';
import LoginForm from '../components/LoginPageComponents/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from "react-spinners";
const Login:React.FC = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Login';
        if(isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated])
    return (
        <>
            {
                !isAuthenticated && <LoginForm />
            }

            {
                isAuthenticated && <div className='loader_overlay'>
                <MoonLoader
                    color={'#C86A83'}
                    loading={isAuthenticated}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            }
        </>
    );
}

export default Login;