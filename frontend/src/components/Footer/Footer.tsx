import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={classes.footer}>
            <Container fluid>
                <hr />
                <Row>
                    <Col>
                        <ul>
                            <li className='text-dark'><b>About Us</b></li>
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Blogs</li>
                            <li>Testimonials</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li className='text-dark'><b>Support</b></li>
                            <li>Help Desk</li>
                            <li>FAQs</li>
                            <li>Track your order</li>
                            <li>Terms & Conditions</li>
                            <li>Cancellation Policy</li>
                            <li>Privacy & Policy</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li className='text-dark'><b>Social Links</b></li>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>twitter</li>
                            <li>linkedin</li>
                            <li>Whatsapp</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li className='text-dark'><b>Information</b></li>
                            <li>Phone: (111)-111-1111</li>
                            <li>Email: info@dailyshop.com</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li className='text-dark'><b>Download Ous Apps</b></li>
                            <li className='mb-2'>
                                <img width={150} src='https://nybizz.es/assets/Images/googleplay.png' alt='Play Store' />
                            </li>
                            <li>
                                <img width={150} src='https://nybizz.es/assets/Images/appleplay.png' alt='App Store' />
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <Row className='mb-1'>
                    <Col>© 2023 www.reactecom.com all rights reserved</Col>
                    {/* <Col>
                        <img className='float-right' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment" />
                    </Col> */}
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;