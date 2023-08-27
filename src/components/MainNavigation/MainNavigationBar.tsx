import React, {useState} from 'react';
import { Link } from 'react-router-dom';

// style
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaCartShopping } from "react-icons/fa6";
import classes from './MainNavigation.module.css';
import ListGroup from 'react-bootstrap/ListGroup';

const MainNavigationBar: React.FC = () => {
    // const [show,setDropDown] = useState(false);
    // const toggleDropdown = () => {
    //     setDropDown(!show)
    // }
    return (
        <>
            {['lg'].map((expand, index) => (
                <Navbar sticky="top" key={index} expand={expand} className="bg-body-tertiary shadow">
                    <Container fluid>
                        <Navbar.Brand>
                            <Link to={'/'} className={`${classes.brand_name}`}>
                                <img src='https://media.istockphoto.com/id/1205419959/vector/vegetables-on-shopping-cart-trolley-grocery-logo-icon-design-vector.jpg?s=612x612&w=0&k=20&c=HgCTmq-4R0-MvKIGrSFJcifqqoJIcducRZBVTO4V5TU=' width={30} alt='Grocery' />
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='border-0 shadow-sm' />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    React Ecom
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>

                                <Nav className="me-auto">
                                    <NavDropdown className={classes.dropdown_box} title="Catrgories" id="collasible-nav-dropdown">
                                        <ListGroup className={`${classes.list_group_box}`}>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0' active>
                                                    Action
                                                </ListGroup.Item>
                                            </Link>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0'>
                                                    Action
                                                </ListGroup.Item>
                                            </Link>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0'>
                                                    ActionActio
                                                </ListGroup.Item>
                                            </Link>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0'>
                                                    ActionActionActionActionActionAction ActionActionActionAction
                                                </ListGroup.Item>
                                            </Link>
                                        </ListGroup>
                                    </NavDropdown>
                                </Nav>

                                <Nav className="me-auto">
                                    <Form className={`d-flex me-auto`}>
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className={`shadow-sm ${classes.search_input}`}
                                            aria-label="Search"
                                        />
                                    </Form>
                                </Nav>

                                <Nav>
                                    <NavDropdown align={{ lg: 'end' }} title="My Account" id="collasible-nav-dropdown">
                                        <ListGroup>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0'>
                                                    My Profile
                                                </ListGroup.Item>
                                            </Link>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0'>
                                                    Wishlist
                                                </ListGroup.Item>
                                            </Link>
                                            <Link to={'/category/12/products'} className={`${classes.category_list} shadow-sm mb-1`}>
                                                <ListGroup.Item className='border-0'>
                                                    Orders
                                                </ListGroup.Item>
                                            </Link>
                                        </ListGroup>
                                    </NavDropdown>
                                    <Nav.Link href="#deets">
                                        <FaCartShopping />
                                        (10)
                                    </Nav.Link>
                                    <Link to={'/login'} className='nav-link'>
                                        Login
                                    </Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default MainNavigationBar;