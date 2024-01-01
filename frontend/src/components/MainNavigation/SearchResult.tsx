import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import classes from '../HomePageComponents/Category/Category.module.css/';
import Spinner from 'react-bootstrap/Spinner';
import ProductCard from '../Products/ProductCard';
const SearchResult: React.FC = () => {
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [products, setProducts] = useState([]);
    const params = useParams();
    useEffect(() => {
        async function getSearchResult() {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products/search?q=${params.searchQuery}`);
            const data = await response.json();
            setProducts(data.products);
            setLoading(false);
        }
        getSearchResult();
    }, [params])
    return (
        <>
            <section className={`${classes.category_section}`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <div className={`${classes.heading} p-2`}>
                            <h5 className='text-dark'>Searching results for: {params.searchQuery}</h5>
                            {/* <Link to="/category/2/products">VIEW ALL</Link> */}
                        </div>
                        <Card.Body>
                            {
                                !isLoading && products.length != 0 &&
                                <Row xs={2} md={4} lg={5}>
                                    {
                                        products.map(product => (
                                            <Col key={product.id}>
                                                <ProductCard product={product} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            }

                            {
                                !isLoading && products.length == 0 &&
                                <div className='m-4' style={{ display: 'flex', justifyContent: 'center' }}> 
                                            <h4>No product found</h4>
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

export default SearchResult;