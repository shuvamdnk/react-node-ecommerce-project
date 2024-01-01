import React,{useEffect} from 'react';
import SignupForm from '../components/LoginPageComponents/LoginForm/SignupForm';

const Signup:React.FC = () => {
    useEffect(() => {
        document.title = 'Signup';
    },[])
    return (
        <>
            <SignupForm/>
        </>
    );
}

export default Signup;