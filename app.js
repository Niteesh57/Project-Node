const exp = require('express');
const expressLayouts = require('express-ejs-layouts');
const AuthRouter = require('./Controllers/signup');
const fs = require('fs');
const https = require('http');
const helmet = require('helmet');
const app = exp();

require('dotenv').config();

app.use(function s(req, res, next) {
    let dates = Date.now();
    res.locals.title = "My App";
    let t1 = Date.now() - dates;
    console.log(t1);
    next();
});

app.set('view engine', 'ejs');
app.use(helmet());
app.use(exp.static('public'));
app.use(exp.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', './Layouts/unauth.layout.ejs');

app.use(AuthRouter);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Replace `public_key.pem` with `certificate.pem`
https.createServer({
}, app).listen(3000, () => {
    console.log('HTTPS Server is running on port 3000');
});
