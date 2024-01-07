import React,{useEffect} from 'react';

// Components
import CartContent from '../components/CartComponents/CartContent';
const Cart: React.FC = () => {
    useEffect(() => {
        document.title = 'Carts';
    },[])
    return (
        <>
         <CartContent/>
        </>
    );
}

export default Cart;