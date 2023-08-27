import React from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import classes from './RelatedProduct.module.css';

import ProductCard from '../../Products/ProductCard';

const Catrgory: React.FC = () => {
    return (
        <>
            <section className={`${classes.category_section}`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div className={`${classes.heading} p-2`}>
                            <h5 className='text-dark'>Related Products</h5>
                            {/* <Link to="/category/2/products">VIEW ALL</Link> */}
                        </div>
                        <Card.Body>
                            <Row xs={2} md={4} lg={5}>
                                <Col>
                                    <ProductCard/>
                                </Col>
                                <Col>
                                    <ProductCard/>
                                </Col>
                                <Col>
                                    <ProductCard/>
                                </Col>
                                <Col>
                                    <ProductCard/>
                                </Col>
                                <Col>
                                    <ProductCard/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default Catrgory;