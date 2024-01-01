import React from 'react';
import parse from 'html-react-parser';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import classes from './ProductDetails.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
const ProductDetails: React.FC = () => {
    const description = '<p class="text-danger">Data</p>';

    return (
        <>
            <section className={`mt-3 mb-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <Card.Body>
                            <Row>
                                <Col sm={5} className={`${classes.image_col}`}>
                                    <img src="https://rukminim2.flixcart.com/image/832/832/kqidx8w0/edible-oil/t/w/k/na-pouch-rice-bran-oil-fortune-original-imag4gb3ufzzgqtu.jpeg?q=70" alt="" />
                                    <br />
                                    
                                </Col>
                                <Col sm={7} className={`${classes.product_destails_col}`}>
                                    <h5>Fortune Kachi Ghani Mustard Oil Pouch  (1 L)</h5>

                                    <span>
                                        <Badge bg="success">4.5</Badge> 4 Ratings & 0 Reviews
                                    </span>
                                    <br />
                                    <span className='text-success'>Extra ₹6333 off  70% off</span>

                                    <span><h3>₹26,999</h3></span>

                                    <span><del>₹89,999</del></span>

                                    <br />

                                    <div className='m-2'>
                                    <Button size="sm" className='border-0 shadow-sm' variant="primary">Add To Wishlist</Button>
                                    <Button size="sm" className='border-0 shadow-sm' variant="success">Add To Cart</Button>
                                    </div>

                                    <span>Highlights:</span>

                                    <ul>
                                        <li>Used For: Cooking</li>
                                        <li>Processing Type: Cold Pressured</li>
                                    </ul>

                                    <hr />

                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Specifications</Accordion.Header>
                                            <Accordion.Body>
                                                <span>Brand</span> : <span>brozzo</span>
                                                <br />
                                                <span>Model Name</span> : <span>GT GAMER- I-7 4220</span>

                                                <span>{parse(description)}</span>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Ratings & Reviews</Accordion.Header>
                                            <Accordion.Body>
                                                <div className={`${classes.rating_overview_div}`}>
                                                    <div>
                                                        <h3>4.5</h3>
                                                    </div>

                                                    <Button size="sm" className='border-0 shadow-sm' variant="outline-success">Rate Product</Button>
                                                    
                                                </div>

                                                <span>4 Ratings & 0 Reviews</span>


                                                <hr />

                                                <div className={`p-2 border mb-1 rounded`}>
                                                    <span><Badge bg="success">4.5</Badge> <span>Awesome</span> </span>
                                                    <p>
                                                    Very good quality of kachi ghani
                                                    </p>
                                                </div>

                                                <div className={`p-2 border mb-1 rounded`}>
                                                    <span><Badge bg="success">4.5</Badge> <span>Awesome</span> </span>
                                                    <p>
                                                    Satisfied
                                                    </p>
                                                </div>


                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default ProductDetails;