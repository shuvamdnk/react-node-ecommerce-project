import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
const Profile: React.FC = () => {
    useEffect(() => {
        document.title = 'Profile';
    }, [])

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51KDoSMSGngy0HaXE1m7zpwOPOQezwo3xAYHUQORWMmyiptOyDnI7PAEePBvOWPaTkrJNfQ3FM1v9s4IetAU6Pbq500DRyrWnQG');

        const response = await fetch(`http://localhost:5000/create-checkout-session`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();

    }

    return (
        <>
            <p>Profile</p>
            <button onClick={makePayment}>Pay Now</button>
        </>
    );
}

export default Profile;