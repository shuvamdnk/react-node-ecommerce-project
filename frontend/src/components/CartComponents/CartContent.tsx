import React,{useEffect} from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const CartContent: React.FC = () => {
    useEffect(() => {
        document.title = 'Carts';
    },[])
    return (
        <>
          <section className={`mt-3 mb-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <h2>cart</h2>
                    </Card>
                </Container>
            </section>
        </>
    );
}

export default CartContent;