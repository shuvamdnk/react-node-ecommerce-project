import React from 'react';
import { Form, Link } from 'react-router-dom';
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
const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
}

const SignupForm: React.FC = () => {

    const SignupSchema = Yup.object({
        name: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Invalid email address').required('Please enter your email'),
        phone: Yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .required('Please enter your phone number')
            .test(
                "maxDigits",
                "Phone number must be 10 digits",
                (phone) => String(phone).length === 10
            ),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    });

    const { values, errors, touched, isSubmitting, setFieldError,setErrors, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('password', values.password);
            try {
                const resp = await fetch(`${import.meta.env.VITE_NODE_API}/auth/register`, {
                    method: 'POST',
                    body: formData
                });

                const data = await resp.json();

                // console.log(data.errors);

                if (data.errors) {
                    data.errors.forEach(error => {
                        setFieldError(error.param,error.msg)
                    })
                }

                if (data.status == 'success') {
                    // localStorage.setItem('token', resp.data.token);
                    action.resetForm();
                    toast.success('Registration Successful.');
                    // navigate('/');
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
                            <h4 className='m-3'><b>Sign up</b></h4>
                            <Card.Body>
                                <form onSubmit={handleSubmit}>
                                    <FloatingLabel
                                        label="Name"
                                        className="mb-3"
                                    >
                                        <BSForm.Control
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            className='shadow-sm'
                                            id='name'
                                            name='name'
                                            type="text"
                                            placeholder="Name"
                                            isInvalid={touched.name && Boolean(errors.name)}
                                        />
                                        <BSForm.Control.Feedback type="invalid">
                                            {touched.name && errors.name}
                                        </BSForm.Control.Feedback>
                                    </FloatingLabel>


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

                                    <FloatingLabel
                                        label="Phone"
                                        className="mb-3"
                                    >
                                        <BSForm.Control
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            className='shadow-sm'
                                            id='phone'
                                            name='phone'
                                            type="text"
                                            placeholder="Phone"
                                            isInvalid={touched.phone && Boolean(errors.phone)}
                                        />
                                        <BSForm.Control.Feedback type="invalid">
                                            {touched.phone && errors.phone}
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
                                        <Button disabled={isSubmitting} className='border-0' size='lg' type='submit' variant="success">Sign up</Button>
                                    </div>
                                    <span>Already have account? <Link to={'/login'}>Login</Link> </span>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default SignupForm;