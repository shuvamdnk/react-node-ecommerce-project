"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const apiRoute = (0, express_1.Router)();
const stripe = new stripe_1.default(String(process.env.STRIPE_SECRET));
// Controllers
const UserController_1 = require("../controller/UserController");
// Validation
const apiValidation_1 = require("../validation/apiValidation");
// Middleware 
const apiAuth_1 = require("../middleware/apiAuth");
const multer_1 = __importDefault(require("multer"));
const form_data = (0, multer_1.default)();
// api routes
/****************  Non auth routes ******************/
// User login / register
apiRoute.post('/auth/login', form_data.any(), (0, apiValidation_1.loginValidationRules)(), UserController_1.UserLogin);
apiRoute.post('/auth/register', form_data.any(), (0, apiValidation_1.signupValidationRules)(), UserController_1.UserRegistration);
/**************** auth routes ******************/
apiRoute.get('/auth/verify', form_data.any(), apiAuth_1.auth, UserController_1.UserVerify);
apiRoute.post('/create-checkout-session', async (req, res, next) => {
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
    ];
    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: product.name,
                images: [product.image]
            },
            unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
    }));
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
        payment_method_types: ['card'],
        line_items: lineItems,
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
    });
});
exports.default = apiRoute;
