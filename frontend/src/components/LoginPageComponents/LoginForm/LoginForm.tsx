import React from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form as BSForm } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { authSliceActions } from '../../../store/slices/auth-slice';
import { useDispatch } from 'react-redux';
const initialValues = {
    email: '',
    password: '',
}

const LoginForm: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Please enter your email'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    });

    const { values, errors, touched, isSubmitting, setFieldError,setErrors, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            try {
                const resp = await fetch(`${import.meta.env.VITE_NODE_API}/auth/login`, {
                    method: 'POST',
                    body: formData
                });

                const data = await resp.json();

                if (data.errors) {
                    data.errors.forEach(error => {
                        setFieldError(error.param,error.msg)
                    })
                }

                if (data.status == 'success') {
                    localStorage.setItem('access_token', data.access_token);
                    action.resetForm();
                    toast.success('Login Successful.');
                    dispatch(authSliceActions.userLogin(data.access_token));
                    navigate('/');
                }
            } catch (error) {
                console.log(error);

                // if (error) {
                //     setErrorMessage('Login credentials are invalid!');
                //     setTimeout(() => {
                //         setErrorMessage(false)
                //     }, 5000)
                // }
            }
            action.setSubmitting(false);
        }
    })

    return (
        <section className='mt-3'>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Card className='border-0'>
                            <h4 className='m-3'><b>Login</b></h4>
                            <Card.Body>
                                <form onSubmit={handleSubmit}>
                                <FloatingLabel
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <BSForm.Control
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className='shadow-sm'
                                            id='email'
                                            name='email'
                                            type="email"
                                            placeholder="name@example.com"
                                            isInvalid={touched.email && Boolean(errors.email)}
                                        />
                                        <BSForm.Control.Feedback type="invalid">
                                            {touched.email && errors.email}
                                        </BSForm.Control.Feedback>
                                    </FloatingLabel>

                                    <FloatingLabel className="mb-3" label="Password">
                                        <BSForm.Control
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className='shadow-sm'
                                            id='password'
                                            type="password"
                                            placeholder="Password"
                                            isInvalid={touched.password && Boolean(errors.password)}
                                        />
                                        <BSForm.Control.Feedback type="invalid">
                                            {touched.password && errors.password}
                                        </BSForm.Control.Feedback>
                                    </FloatingLabel>
                                    <div className="d-grid gap-2">
                                    <Button disabled={isSubmitting} className='border-0' size='lg' type='submit' variant="success">Login</Button>
                                    </div>
                                    <span>Don't have account? <Link to={'/signup'}>Create new account</Link> </span>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default LoginForm;