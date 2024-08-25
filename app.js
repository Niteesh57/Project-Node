const exp = require('express');
const app = exp();

app.set('view engine','ejs');
app.use(exp.static('public'));
app.use(exp.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.render('./Auth/login.ejs');
})
app.get('/register', (req,res)=>{
    res.render('./Auth/signup.ejs');
})
app.post('/login', (req,res)=>{
    const {username, password} = req.body
    if(username === 'admin' && password === 'admin'){
        console.log(username,password)
        res.render('./Home/index.ejs')
    }
    else{
        res.render('./Auth/login.ejs')
    }
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

