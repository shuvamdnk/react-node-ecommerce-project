import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import AccountDetails from '../components/ProfileComponents/AccountDetails';
const Profile: React.FC = () => {
    useEffect(() => {
        document.title = 'Profile';
    }, [])

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51KDoSMSGngy0HaXE1m7zpwOPOQezwo3xAYHUQORWMmyiptOyDnI7PAEePBvOWPaTkrJNfQ3FM1v9s4IetAU6Pbq500DRyrWnQG');

        const response = await fetch(`http://localhost:5000/api/create-checkout-session`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        const session = await response.json();

        const result = stripe?.redirectToCheckout({
            sessionId:session.id
        })

        if(result?.error){
            console.log(result?.error);
            
        }

    }

    return (
        <>
           {/* <AccountDetails/> */}
           <button onClick={makePayment}>pay</button>
        </>
    );
}

export default Profile;