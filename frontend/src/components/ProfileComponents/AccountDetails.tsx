import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
export default function AccountDetails() {
    return (
        <>
            <section className={`mt-3 mb-3`}>
                <Container fluid>
                    <Card className='shadow-sm border-0'>
                        <h2>Account</h2>
                    </Card>
                </Container>
            </section>
        </>
    )
}
