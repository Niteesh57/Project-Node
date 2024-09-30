const exp = require('express');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
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

app.use(expressLayouts);
app.set('layout', './Layouts/unauth.layout.ejs');

// Home route - login page
app.get('/', (req, res) => {
    res.render('./Auth/login.ejs');
});

// Registration route
app.get('/register', (req, res) => {
    res.render('./Auth/signup.ejs');
});

// Login route
app.post('/login', (req,res)=>{ 
    
    const { username, password} = req.body
    if(username === 'admin' && password === 'admin'){
        fs.readFile('./views/data/data.json', 'utf8',(err,data)=>{
            if(err) console.log(err);
            else{
                const parsedData: JSON = JSON.parse(data);
                res.render('./Home/index.ejs', { layout:'./Layouts/auth.layout.ejs', data: parsedData.products })
            }
        })
    }
    else{
        res.render('./Auth/login.ejs')
    }
})

// Logout route
app.post('/logout', (req, res) => {
    res.render('./Auth/login.ejs');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
