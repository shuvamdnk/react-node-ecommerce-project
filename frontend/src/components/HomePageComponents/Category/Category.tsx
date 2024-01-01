import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import classes from './Category.module.css';

import ProductCard from '../../Products/ProductCard';

const Catrgory: React.FC = ({skip, limit, title}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`https://dummyjson.com/products/?skip=${skip}&limit=${limit}`);
            const data = await response.json();
            console.log(data);
            setProducts(data.products)
        }
        getProducts();
    }, [])
    return (
        <>
            <section className={`${classes.category_section}`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div className={`${classes.heading} p-2`}>
                            <h5 className='text-dark'>{title}</h5>
                            {/* <Link to="/category/2/products">VIEW ALL</Link> */}
                        </div>
                        <Card.Body>
                            <Row xs={2} md={4} lg={5}>
                                {
                                    products.map(product => (
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

export default Catrgory;