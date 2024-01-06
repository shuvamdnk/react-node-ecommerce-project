import { Router, Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
const apiRoute = Router();

const stripe = new Stripe(String(process.env.STRIPE_SECRET))

// Controllers
import { UserLogin, UserRegistration, UserVerify } from '../controller/UserController';

// Validation
import { signupValidationRules, loginValidationRules, StudentStoreRules, StudentUpdateRules } from '../validation/apiValidation';

// Middleware 
import { auth } from '../middleware/apiAuth';
import multer from 'multer';
const form_data = multer();

// api routes
/****************  Non auth routes ******************/
// User login / register
apiRoute.post('/auth/login', form_data.any(), loginValidationRules(), UserLogin);
apiRoute.post('/auth/register', form_data.any(), signupValidationRules(), UserRegistration);

/**************** auth routes ******************/
apiRoute.get('/auth/verify', form_data.any(), auth, UserVerify);
apiRoute.post('/create-checkout-session', auth, async (req, res, next) => {
    console.log('here');

    const products = [
        {
            name: 'ASUS VivoBook 14 Intel Core i3 10th Gen 1005G1',
            image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/w/q/x/-original-imagpxgqge3czyhy.jpeg?q=70',
            price: 40000,
            quantity: 2
        },
        {
            name: 'Google Pixel 7a (Sea, 128 GB)  (8 GB RAM)',
            image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/z/b/d/-original-imagpgx48f4szdvf.jpeg?q=70',
            price: 35000,
            quantity: 1
        }
    ]
    const lineItems = products.map((product) => (
        {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                unit_amount: Math.round(product.price * 100),
            },
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: 10,
            },
            quantity: product.quantity,
        }
    ))

    console.log(lineItems);



    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: [
    //         {
    //             price: 1200,
    //             quantity: 2,
    //         },
    //     ],
    //     mode: 'payment',
    //     success_url: 'http://localhost:5173/payment/success',
    //     cancel_url: 'http://localhost:5173/payment/failed',
    // })


    const session = await stripe.checkout.sessions.create({
        customer_email: 'sd@test.com',
        payment_method_types: ['card'],
        line_items: lineItems,
        phone_number_collection: {
            enabled: true,
        },
        // shipping_address_collection: {
        //     allowed_countries: ['US','IN'],
        // },
        // line_items: [
        //     {
        //         price_data: {
        //             currency: 'inr',
        //             product_data: {
        //                 name: 'ASUS VivoBook 14 Intel Core i3 10th Gen 1005G1',
        //                 images:['https://rukminim2.flixcart.com/image/416/416/xif0q/computer/w/q/x/-original-imagpxgqge3czyhy.jpeg?q=70']
        //             },
        //             unit_amount: 2000*100,
        //             // tax_behavior: 'exclusive',
        //         },
        //         // adjustable_quantity: {
        //         //     enabled: true,
        //         //     minimum: 1,
        //         //     maximum: 10,
        //         // },
        //         quantity: 1,
        //     },
        // ],
        // automatic_tax: {
        //     enabled: true,
        // },
        mode: 'payment',
        success_url: 'http://localhost:5173/payment/success',
        cancel_url: 'http://localhost:5173/payment/failed',
    });

    res.json({
        id: session.id
    })
})

export default apiRoute;