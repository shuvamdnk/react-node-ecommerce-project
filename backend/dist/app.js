"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// env veriables
const PORT = Number(process.env.PORT || '5000');
const HOST = String(process.env.HOST || 'localhost');
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_errors_1 = __importDefault(require("http-errors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const web_1 = __importDefault(require("./routes/web"));
const api_1 = __importDefault(require("./routes/api"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_flash_1 = __importDefault(require("express-flash"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./middleware/auth");
// import sequelize from './config/database';
// morgan
app.use((0, morgan_1.default)('dev'));
// cors
app.use((0, cors_1.default)());
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
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100 // limit each IP to 100 requests per windowMs
});
// Apply the limiter to all routes
// app.use(limiter);
// Middlewares
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// for parsing application/json
// app.use(bodyParser.json()); 
// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// session and cookie set
app.use((0, cookie_parser_1.default)());
app.use((0, express_flash_1.default)());
app.use((0, express_session_1.default)({
    secret: 'super-secret',
    name: 'connect.sid',
    cookie: { path: '/', secure: false, sameSite: true, maxAge: 60000 },
    rolling: false,
    resave: true,
    proxy: true,
    saveUninitialized: true
}));
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
app.use(express_ejs_layouts_1.default);
app.set('layout', 'layouts/app');
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// app.use('*',authUser);
app.use(auth_1.authUser, web_1.default);
app.use('/api', limiter, api_1.default);
// 404 Handler
app.use((req, res, next) => {
    next(http_errors_1.default.NotFound());
});
// Error Handler
app.use((error, req, res, next) => {
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
    console.log(chalk_1.default.bold.yellow.underline(`Server Started : http://${HOST}:${PORT}`));
});
