const exp = require('express');
const expressLayouts = require('express-ejs-layouts');
const AuthRouter = require('./Controllers/signup');
const helmet = require('helmet');
const app = exp();


app.use(function s(req,res,next){
    let dates = Date.now()
    res.locals.title = "My App";
    let t1 = Date.now() - dates
    console.log(t1)
    next();
})
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

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
