import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { authSliceActions } from '../../store/slices/auth-slice';

const MainNavigationBar: React.FC = () => {
    // const [show,setDropDown] = useState(false);
    // const toggleDropdown = () => {
    //     setDropDown(!show)
    // }

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    // console.log(isAuthenticated);


    const [navShow, setNavShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [searchTest, setSearchText] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function getCategories() {
            const response = await fetch('https://dummyjson.com/products/categories')
            const data = await response.json();
            setCategories(data);
        }
        getCategories();
    }, [])

    const handleSearch = (e: Event) => {
        e.preventDefault();
        if (searchTest) {
            navigate({
                pathname: `/search/${searchTest}`,
            })
        }
    }

    const handleLogout = (e: Event) => {
        localStorage.removeItem('access_token');
        dispatch(authSliceActions.userLogout())
    }

    return (
        <>
            {['lg'].map((expand, index) => (
                <Navbar sticky="top" key={index} expand={expand} className="bg-body-tertiary shadow">
                    <Container fluid>
                        <Navbar.Brand>
                            <Link to={'/profile'} className={`${classes.brand_name}`}>
                                <img src={'./logo.png'} width={30} alt='Shopping' />
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
                                    <NavDropdown onSelect={(e) => console.log(e)} rootCloseEvent="mousedown" onClick={() => setNavShow(!navShow)} className={classes.dropdown_box} title="Catrgories" id="collasible-nav-dropdown">
                                        <ListGroup className={`${classes.list_group_box}`}>
                                            {
                                                categories.map((category) => (
                                                    <Link key={category} to={`/category/${category}/products`} onClick={(e) => setNavShow(false)} className={`${classes.category_list} shadow-sm mb-1`}>
                                                        <ListGroup.Item className='border-0'>
                                                            {(category.charAt(0).toUpperCase() + category.slice(1)).replace(/-/g, " ")}
                                                        </ListGroup.Item>
                                                    </Link>
                                                ))
                                            }
                                        </ListGroup>
                                    </NavDropdown>
                                </Nav>

                                <Nav className="me-auto">
                                    <Form className={`d-flex me-auto`} onSubmit={handleSearch}>
                                        <Form.Control
                                            type="search"
                                            name='search'
                                            autoComplete='off'
                                            onChange={(e) => setSearchText(e.target.value)}
                                            placeholder="Search"
                                            className={`shadow-sm ${classes.search_input}`}
                                            aria-label="Search"
                                        />
                                    </Form>
                                </Nav>

                                <Nav>
                                    <Nav.Link href="#deets">
                                        <FaCartShopping />
                                        (10)
                                    </Nav.Link>
                                    {
                                        isAuthenticated &&
                                        <NavDropdown align={{ lg: 'end' }} title="My Account" id="collasible-nav-dropdown">
                                            <ListGroup>
                                                <Link to={'/profile'} className={`${classes.category_list} shadow-sm mb-1`}>
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
                                                <Link onClick={handleLogout} className={`${classes.category_list} shadow-sm mb-1`}>
                                                    <ListGroup.Item className='border-0 text-danger'>
                                                        Logout
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </NavDropdown>
                                    }

                                    {
                                        !isAuthenticated &&
                                        <Link to={'/login'} className='nav-link'>
                                            Login
                                        </Link>
                                    }

                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

            {/* Toastify */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default MainNavigationBar;