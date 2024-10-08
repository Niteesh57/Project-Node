const exp = require('express');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const Login = require('./Controllers/signup');
const app = exp();


app.use(function s(req,res,next){
    let dates = Date.now()
    res.locals.title = "My App";
    let t1 = Date.now() - dates
    console.log(t1)
    next();
})
app.set('view engine', 'ejs');
app.use(exp.static('public'));
app.use(exp.urlencoded({ extended: true }));

app.use(Login);
app.use(expressLayouts);
app.set('layout', './Layouts/unauth.layout.ejs');


// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
