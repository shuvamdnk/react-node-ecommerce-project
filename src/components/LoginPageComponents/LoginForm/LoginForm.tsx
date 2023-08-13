import React from 'react';
import { Form, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form as BSForm } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const LoginForm: React.FC = () => {
    return (
        <section className='mt-3'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className='border-0'>
                            <h4 className='m-3'><b>Login</b></h4>
                            <Card.Body>
                                <Form>
                                    <FloatingLabel
                                        controlId=""
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <BSForm.Control className='shadow-sm' type="email" placeholder="name@example.com" />
                                    </FloatingLabel>

                                    <FloatingLabel className="mb-3" controlId="" label="Password">
                                        <BSForm.Control className='shadow-sm' type="password" placeholder="Password" />
                                    </FloatingLabel>
                                    <div className="d-grid gap-2">
                                    <Button className='border-0' size='lg' type='submit' variant="success">Login</Button>
                                    </div>
                                    <span>Don't have account? <Link to={'/signup'}>Create new account</Link> </span>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default LoginForm;