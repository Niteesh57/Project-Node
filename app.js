const exp = require('express');
const expressLayouts = require('express-ejs-layouts');
const AuthRouter = require('./Controllers/signup');
const { WebSiterouter } = require('./Controllers/website');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const https = require('http');
const helmet = require('helmet');
const env = process.env;
const app = exp();

require('dotenv').config();

app.use(function s(req, res, next) {
    let dates = Date.now();
    res.locals.title = "My App";
    let t1 = Date.now() - dates;
    console.log(t1);
    next();
});

// Use cookie-parser middleware
app.use(cookieParser());

// Your JWT verification middleware
// app.use(function data(req, res, next) {
//     try {
//         const token = req.cookies.JWT; // Access the JWT from cookies
//         if (!token) {
//             return res.render('../views/Auth/login.ejs', { 
//                 layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' 
//             });
//         } else {
//             const decoded = jwt.verify(token, process.env.SECRETE_KEY);
//             if (!decoded) {
//                 return res.render('../views/Auth/login.ejs', { 
//                     layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' 
//                 });
//             }
//             req.user = decoded; // Attach the decoded user information to the request object
//             return next(); // Call next() to pass control to the next middleware
//         }
//     } catch (error) {
//         console.error('Error verifying token:', error);
//         return res.render('../views/Auth/login.ejs', { 
//             layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' 
//         });
//     }
// });


const authMiddleware = (req, res, next) => {
    const token = req.cookies.JWT;
    console.log(token);
    if (!token) {
      return res.render('../views/Auth/login.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRETE_KEY);
      req.user = decoded;
      next();
    } catch (err) {
        return res.render('../views/Auth/login.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
    }
  };
  
// Apply authMiddleware to all routes (or specific routes if desired)
app.set('view engine', 'ejs');

// app.use(helmet());


WebSiterouter.use(exp.static('public'));
app.use(exp.static('public'));

app.use(exp.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout','./Layouts/auth.layout.ejs');

app.use(AuthRouter);
app.use("/blogs",WebSiterouter,authMiddleware);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Replace `public_key.pem` with `certificate.pem`

module.exports = { exp }
https.createServer({
}, app).listen(3000, () => {
    console.log('HTTPS Server is running on port 3000');
});
