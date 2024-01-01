import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const ProductCard: React.FC = (props) => {
    
    const [wishlist, setWishlist] = useState(false);

    const toggleWishList = () => {
        setWishlist(preWishState => !preWishState);
    }
    return (
        <>
            <Card className={`border-0 shadow-sm mt-1 ${classes.product_card}`}>
                <LazyLoadImage width={'100%'} variant="top" className={`${classes.product_images}`} effect="blur" alt={props.product.title} src={props.product.thumbnail} />
                <button className={`${classes.wishlist_btn}`} onClick={toggleWishList}>
                    {wishlist ? <FaHeart /> : <FaRegHeart />}

                </button>
                <Card.Body>
                    <div className={classes.product_pricing}>
                        <span>${props.product.price}</span>
                        {/* <span style={{ textDecoration: 'line-through' }}>₹1049</span> */}
                        <span className='text-success'><b>{props.product.stock > 0 ? 'In Stock' : "Out of Stock"}</b></span>
                    </div>
                    <Link to={`/product-details/${props.product.id}/${props.product.category}`} style={{textDecoration:'none'}}>
                        <p className={classes.product_text}>
                            {props.product.title}
                        </p>
                    </Link>

                    {/* <div>
                        <Link to={'/product-details/455'} className={`${classes.view_details_btn} btn btn-sm`}>View details</Link>
                    </div> */}
                </Card.Body>
            </Card>
        </>
    );
}

export default ProductCard;