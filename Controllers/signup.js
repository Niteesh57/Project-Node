const Express = require('express')
const { SignUpModel } = require('../Models/database');
const fs = require('fs');

const AuthRouter = Express.Router();;

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))

AuthRouter.get('/', (req, res) => {
    res.render('../views/Auth/login.ejs',{layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs'});
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
                res.render('../views/Home/index.ejs', { data: parsedData.products })
            }
        })
    }catch(err){
        res.render('../views/Auth/signup.ejs', {layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs'});
    }
});

// Registration route
AuthRouter.get('/register', (req, res) => {
    res.render('../views/Auth/signup.ejs', {layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs'});
});

AuthRouter.get('/home', (req,res)=>{
    fs.readFile('C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Data/data.json', 'utf8',(err,data)=>{
        if(err) console.log(err);
        else{
            const parsedData = JSON.parse(data);
            res.render('../views/Home/index.ejs', { data: parsedData.products })
        }
    })
})

AuthRouter.post('/login', (req,res)=>{ 
    
    const { username, password} = req.body
    SignUpModel.findOne({name: username, password: password})
    .then(user =>{
        if (user)
        {
        fs.readFile('C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Data/data.json', 'utf8',(err,data)=>{
            if(err) console.log(err);
            else{
                const parsedData = JSON.parse(data);
                res.render('../views/Home/index.ejs', { data: parsedData.products })
            }
        })
        }
        else{
            res.render('../views/Auth/login.ejs', {layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs'});
        }
    }).catch(err =>{
        res.render('../views/Auth/login.ejs', {layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs'});
    });
})

// Logout route
AuthRouter.post('/logout', (req, res) => {
    res.render('../views/Auth/login.ejs', { layout:'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs'});
});

module.exports = AuthRouter;