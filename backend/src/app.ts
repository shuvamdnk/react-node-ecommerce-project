import dotenv from 'dotenv';
dotenv.config();
// env veriables
const PORT = Number(process.env.PORT || '5000');
const HOST = String(process.env.HOST || 'localhost');
import chalk from 'chalk';
import express, { Request, Response, NextFunction } from 'express';
const app = express();
import createHttpError, { HttpError } from 'http-errors';
import rateLimit from 'express-rate-limit';
import routes from './routes/web';
import apiRoutes from './routes/api';
import { json } from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import { SessionData, Store, MemoryStore, Session } from 'express-session';
import cookieParser from 'cookie-parser';
import expressLayout from 'express-ejs-layouts';
import flash from 'express-flash';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { authUser } from './middleware/auth';
// import sequelize from './config/database';

// morgan
app.use(morgan('dev'));

// cors
app.use(cors());

// helmet
// app.use(helmet());
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.crossOriginEmbedderPolicy());
// app.use(helmet.crossOriginOpenerPolicy());
// app.use(helmet.crossOriginResourcePolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.originAgentCluster());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());


// RateLimiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply the limiter to all routes
// app.use(limiter);

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for parsing application/json
// app.use(bodyParser.json()); 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 

// session and cookie set
app.use(cookieParser());
app.use(flash());
app.use(
    session({
        secret: 'super-secret',
        name: 'connect.sid',
        cookie: { path: '/', secure: false, sameSite: true, maxAge: 60000 },
        rolling: false,
        resave: true,
        proxy: true,
        saveUninitialized: true
    })
)

// app.use(
//     session({
//         secret: 'keyboard cat',
//         name: 'connect.sid',
//         store: new MemoryStore(),
//         cookie: { path: '/', httpOnly: true, secure: false, sameSite: true },
//         genid: (req: express.Request): string => '',
//         rolling: false,
//         resave: true,
//         proxy: true,
//         saveUninitialized: true,
//     }),
// );


app.use(expressLayout);
app.set('layout', 'layouts/app');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// app.use('*',authUser);
app.use(authUser, routes);
app.use('/api', limiter, apiRoutes)

// 404 Handler
app.use((req, res, next) => {
    next(createHttpError.NotFound());
});

// Error Handler
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.log('Error is:  ' + error);
    error.status = error.status || 500;
    res.status(error.status);
    res.render('error', {
        error,
        page: error.status,
        layout: 'layouts/error'
    });
});

// app.use((error:Error,req:Request,res:Response,next:NextFunction) => {
//     res.status(500).json({message:err.message});
// });


app.listen(PORT, HOST, () => {
    console.log(chalk.bold.yellow.underline(`Server Started : http://${HOST}:${PORT}`));
});