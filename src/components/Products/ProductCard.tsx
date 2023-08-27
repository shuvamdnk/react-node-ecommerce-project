import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';

import { FaHeart, FaRegHeart } from "react-icons/fa6";

const ProductCard: React.FC = () => {

    const [wishlist, setWishlist] = useState(false);

    const toggleWishList = () => {
        setWishlist(preWishState => !preWishState);
    }
    return (
        <>
            <Card className={`border-0 shadow-sm ${classes.product_card}`}>
                <Card.Img variant="top" className={`${classes.product_images}`} src="https://rukminim2.flixcart.com/image/832/832/xif0q/edible-oil/c/d/5/-original-imagg9yyvysnqs4b.jpeg?q=70" />
                <button className={`${classes.wishlist_btn}`} onClick={toggleWishList}>
                    {wishlist ? <FaHeart /> : <FaRegHeart />}

                </button>
                <Card.Body>
                    <div className={classes.product_pricing}>
                        <span>₹549</span>
                        {/* <span style={{ textDecoration: 'line-through' }}>₹1049</span> */}
                        <span className='text-success'><b>In Stock</b></span>
                    </div>
                    <p className={classes.product_text}>
                        This text is quite long This text is quite long This text is quite long
                    </p>
                    <div>
                        <Link to={'/product-details/455'} className={`${classes.view_details_btn} btn btn-sm`}>View details</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default ProductCard;