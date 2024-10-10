const Express = require('express')
const { SignUpModel } = require('../Models/database');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
const path = require('path');

const AuthRouter = Express.Router();;

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))

AuthRouter.get('/', (req, res) => {
    res.render('../views/Auth/login.ejs');
});


// SignUp route
AuthRouter.post('/signup', async (req, res) => {
    console.log(req.body);
    try{
        const data = new SignUpModel({
            name: req.body.username,
            age: req.body.age,
            mobileNumber: req.body.mobile_number,
            email: req.body.email,
            password: req.body.password
        });

        // await data.save();
        fs.readFile('C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Data/data.json', 'utf8',(err,data)=>{
            if(err) console.log(err);
            else{
                const parsedData = JSON.parse(data);
                res.render('../views/Home/index.ejs', { layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/auth.layout.ejs', data: parsedData.products })
            }
        })
    }catch(err){
        res.render('../views/Auth/signup.ejs');
    }
});

// Registration route
AuthRouter.get('/register', (req, res) => {
    res.render('../views/Auth/signup.ejs');
});

AuthRouter.post('/login', (req,res)=>{ 
    
    const { username, password} = req.body
    if(username === 'admin' && password === 'admin'){
        fs.readFile('C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Data/data.json', 'utf8',(err,data)=>{
            if(err) console.log(err);
            else{
                const parsedData = JSON.parse(data);
                res.render('../views/Home/index.ejs', { layout:'../views/Layouts/auth.layout.ejs', data: parsedData.products })
            }
        })
    }
    else{
        res.render('../views/Auth/login.ejs')
    }
})

// Logout route
AuthRouter.post('/logout', (req, res) => {
    res.render('../views/Auth/login.ejs');
});

module.exports = AuthRouter;