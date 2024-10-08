const Express = require('express').Router();
const AuthRouter = Express;
AuthRouter.get('/', (req, res) => {
    res.render('../Auth/login.ejs');
});

// Registration route
AuthRouter.get('/register', (req, res) => {
    res.render('../views/Auth/signup.ejs');
});

AuthRouter.post('/login', (req,res)=>{ 
    
    const { username, password} = req.body
    if(username === 'admin' && password === 'admin'){
        fs.readFile('./views/data/data.json', 'utf8',(err,data)=>{
            if(err) console.log(err);
            else{
                const parsedData = JSON.parse(data);
                res.render('./Home/index.ejs', { layout:'./Layouts/auth.layout.ejs', data: parsedData.products })
            }
        })
    }
    else{
        res.render('./Auth/login.ejs')
    }
})

// Logout route
AuthRouter.post('/logout', (req, res) => {
    res.render('./Auth/login.ejs');
});

module.exports = AuthRouter;