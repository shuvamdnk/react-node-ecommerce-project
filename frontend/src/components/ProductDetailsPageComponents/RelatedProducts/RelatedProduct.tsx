import React from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import classes from './RelatedProduct.module.css';

import ProductCard from '../../Products/ProductCard';

const RelatedProducts: React.FC = (props) => {
    return (
        <>
            <section className={`${classes.category_section}`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div className={`${classes.heading} p-2`}>
                            <h5 className='text-dark'>Related Products</h5>
                        </div>
                        <Card.Body>
                            <Row xs={2} md={4} lg={5}>
                                {
                                    props.ralatedProducts.length > 0 &&
                                    props.ralatedProducts.map(product => (
                                        <Col key={product.id}>
                                            <ProductCard  product={product}/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default RelatedProducts;