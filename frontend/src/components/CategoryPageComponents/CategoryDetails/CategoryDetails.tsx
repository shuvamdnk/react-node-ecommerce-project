import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import classes from './CategoryDetails.module.css';
import ProductCard from '../../Products/ProductCard';
import { useParams } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
const CatrgoryDetails: React.FC = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState<Boolean>(true);
    useEffect(() => {
        async function getCategoryProducts() {
            const response = await fetch(`https://dummyjson.com/products/category/${params.categoryID}`);
            const data = await response.json();
            setProducts(data.products)
            setLoading(false);
        }
        getCategoryProducts();
    }, [params])
    return (
        <>
            <section className={`${classes.category_section} mt-3 mb-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div className={`p-2`}>
                            <h5 className='text-dark'>{params?.categoryID.charAt(0).toUpperCase() + params?.categoryID.slice(1)}</h5>
                            {/* <p>
                            A rainy day calls for namkeen and hot chai Research shows that drinking this beverage can improve your health. The amount of time the leaves of the Camellia sinensis plant are processed determines whether you end up with a green, black or oolong tea. If you browse online, you can choose from brands like Tata Tea, Red Label, Taj Mahal, and Tetley.
                            </p> */}
                        </div>
                        <Card.Body>
                            {
                                !isLoading && products.length != 0 &&
                                    <Row xs={2} md={4} lg={5}>
                                        {
                                            products.map((product) => (
                                                <Col key={product?.id}>
                                                    <ProductCard product={product} />
                                                </Col>
                                            ))

                                        }
                                    </Row>
                                
                            }

                            {
                                 !isLoading && products.length == 0 &&
                                 <div className='m-4' style={{ display: 'flex', justifyContent: 'center' }}>
                                     {
                                         <h4>No products found of category {params?.categoryID.charAt(0).toUpperCase() + params?.categoryID.slice(1)}</h4>
                                     }
                                 </div>
                            }

                            {
                                isLoading &&
                                <div className='m-4' style={{ display: 'flex', justifyContent: 'center' }}>

                                    <Spinner animation="border" />

                                </div>
                            }


                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default CatrgoryDetails;