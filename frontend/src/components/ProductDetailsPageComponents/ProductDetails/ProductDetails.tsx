import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import classes from './ProductDetails.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import RelatedProducts from '../RelatedProducts/RelatedProduct';
import Form from 'react-bootstrap/Form';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const ProductDetails: React.FC = ({ getDocTitle }) => {
    const [wishlist, setWishlist] = useState(false);

    const toggleWishList = () => {
        setWishlist(preWishState => !preWishState);
    }
    const params = useParams();
    const [product, setProduct] = useState();
    const [message, setMessage] = useState();
    const [categoryProduct, setCategoryProducts] = useState([]);
    useEffect(() => {
        async function getProductDetails() {
            const response = await fetch(`https://dummyjson.com/products/${params.productID}`);
            const data = await response.json();
            if (data.message) {
                setMessage(data.message)
            } else {
                setProduct(data)

                getDocTitle(data.title)
                const cresponse = await fetch(`https://dummyjson.com/products/category/${data.category}`);
                const cdata = await cresponse.json();
                setCategoryProducts(cdata.products)
            }
        }
        async function getCategoryProducts() {
            const response = await fetch(`https://dummyjson.com/products/category/${params.categoryID}`);
            const data = await response.json();
        
            setCategoryProducts(data.products)
        }
        // getCategoryProducts();
        getProductDetails();
    }, [params])

    return (
        <>
            <section className={`mt-3 mb-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        {
                            !product
                                ?
                                <div className='m-4' style={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        !message ?
                                            <Spinner animation="border" />
                                            :
                                            <h4>Product Not Found</h4>
                                    }

                                </div>
                                :

                                <Card.Body>
                                    <Row>
                                        <Col sm={5} className={`${classes.image_col}`}>
                                            <LazyLoadImage src={product.thumbnail} effect='blur' alt={product.title} />
                                            <br />

                                        </Col>

                                        <Col sm={7} className={`${classes.product_destails_col}`}>
                                            <h5>{product.description}</h5>

                                            <span>
                                                <Badge bg="success">{product.rating.toFixed(1)}</Badge> 4 Ratings
                                            </span>
                                            <br />
                                            <span className='text-success'>Extra {product.discountPercentage}% off</span>

                                            <span><h3>${product.price.toFixed(2)}</h3></span>

                                            <span className='text-danger'><del>${(product.price + (product.price * (product.discountPercentage / 100))).toFixed(2)}</del></span>

                                            <br />

                                            <span>Highlights:</span>

                                            <ul>
                                                <li>Title: {product.title}</li>
                                                <li>Brand: {product.brand}</li>
                                                <li>Category: {product.category}</li>
                                                <li>Stock: {product.stock >= 0 ? <span className='text-success fw-bold'>In Stock</span> : <span className='text-danger fw-bold'>Out of Stock</span>}</li>
                                            </ul>
                                            <hr />
                                            <div className='m-2 p-1' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <Button className='m-1 shadow-sm' variant="outline-primary"><FaCartShopping /> Add To Cart</Button>
                                                    <Button style={{ borderRadius: '50%', padding: '5px 6px 5px 6px' }} onClick={toggleWishList} className='shadow-sm m-1 pt-0' variant="outline-danger">
                                                        {wishlist ? <FaHeart /> : <FaRegHeart />}
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Form.Group className="m-1" controlId="exampleForm.ControlInput1">
                                                        <Form.Control type="search" className='shadow-sm' placeholder="Enter Delivery Pincode" />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>
                                    <Row className='mt-4'>
                                        {
                                            product.images.map(image => (

                                                <Col key={image} sm={6} className={`p-2`} style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <LazyLoadImage src={image} effect='blur' alt={product.title} />
                                                    <br />
                                                </Col>

                                            ))
                                        }
                                    </Row>
                                </Card.Body>
                        }
                    </Card>
                </Container>

            </section>
            {
                categoryProduct.length > 0 &&
                <RelatedProducts ralatedProducts={categoryProduct} />
            }

        </>
    );
}

export default ProductDetails;