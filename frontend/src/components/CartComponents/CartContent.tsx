import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { cartSliceActions } from '../../store/slices/cart-slice';
import { FaCartShopping } from "react-icons/fa6";
import { FaCcStripe } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js/pure';
const CartContent: React.FC = () => {

    const cartItems = useSelector((state: any) => state.cart.cartItems);
    const totalCart = useSelector((state: any) => state.cart.totalCart);
    const totalAmount = useSelector((state: any) => state.cart.totalAmount);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(cartItems);
        // console.log(totalAmount);

    }, [cartItems, totalCart, totalAmount])

    function removeCartHandler(product) {
        // console.log(product);
        dispatch(cartSliceActions.addToCart(product));
    }

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51KDoSMSGngy0HaXE1m7zpwOPOQezwo3xAYHUQORWMmyiptOyDnI7PAEePBvOWPaTkrJNfQ3FM1v9s4IetAU6Pbq500DRyrWnQG');
        const formData = new FormData();
        formData.append('cartItems', JSON.stringify(cartItems));
        const response = await fetch(`${import.meta.env.VITE_NODE_API}/create-checkout-session`, {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        const session = await response.json();

        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        })

        if (result?.error) {
            console.log(result?.error);

        }

    }


    return (
        <>
            <section className={`mt-3 mb-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div>
                            <h5 className='text-dark p-2'>Carts</h5>
                        </div>
                        {
                            totalCart > 0
                                ?
                                <>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <h5 className='text-dark p-2'>Total Amount : {totalAmount}</h5>
                                        <Button onClick={makePayment} className='m-1 shadow-sm' ><FaCcStripe className='m-1' /> Proceed to pay</Button>
                                        {/* <button onClick={makePayment}>pay</button> */}
                                    </div>
                                    <Table bordered hover className='m-2'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product Image</th>
                                                <th>Product Name</th>
                                                <th>Product Price</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map(product => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>
                                                            <div style={{ height: '100px' }}>
                                                                <LazyLoadImage style={{ height: '100px', objectFit: 'contain' }} width={'100%'} src={product.thumbnail} effect='blur' alt={product.title} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Link to={`/product-details/${product.id}/${product.category}`}>
                                                                {product.title}
                                                            </Link>
                                                        </td>
                                                        <td>₹{Math.round(product.price * 83)}</td>
                                                        <td>
                                                            <Button className='m-1 shadow-sm' onClick={(e) => removeCartHandler(product)} variant="outline-danger"><FaCartShopping /> Remove From Cart</Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }


                                        </tbody>
                                    </Table>
                                </>
                                :

                                <div style={{
                                    display:'flex',
                                    justifyContent:'center'
                                }}>
                                    <h5 className='text-dark p-2'>Cart Is Empty Shop Now</h5>
                                </div>

                        }
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default CartContent;