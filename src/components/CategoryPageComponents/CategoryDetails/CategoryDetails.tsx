import React from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import classes from './CategoryDetails.module.css';

import ProductCard from '../../Products/ProductCard';

const CatrgoryDetails: React.FC = () => {
    return (
        <>
            <section className={`${classes.category_section} mt-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div className={`p-2`}>
                            <h5 className='text-dark'>Top Selling Products</h5>
                            <p>
                            A rainy day calls for namkeen and hot chai Research shows that drinking this beverage can improve your health. The amount of time the leaves of the Camellia sinensis plant are processed determines whether you end up with a green, black or oolong tea. If you browse online, you can choose from brands like Tata Tea, Red Label, Taj Mahal, and Tetley.
                            </p>
                        </div>
                        <Card.Body>
                            <Row xs={2} md={4} lg={5}>
                                <Col>
                                    <ProductCard />
                                </Col>
                                <Col>
                                    <ProductCard />
                                </Col>
                                <Col>
                                    <ProductCard />
                                </Col>
                                <Col>
                                    <ProductCard />
                                </Col>
                                <Col>
                                    <ProductCard />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default CatrgoryDetails;