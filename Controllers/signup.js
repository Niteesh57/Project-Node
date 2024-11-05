const Express = require('express')
const { SignUpModel } = require('../Models/database');
const fs = require('fs');
const { WebSite } = require('../Models/webSiteModel');
const { Reviews } = require('../Models/reviews')

const AuthRouter = Express.Router();

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }))

AuthRouter.get('/', (req, res) => {
    res.render('../views/Auth/login.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
});


// SignUp route
AuthRouter.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        const data = new SignUpModel({
            name: req.body.username,
            age: req.body.age,
            mobileNumber: req.body.mobile_number,
            email: req.body.email,
            password: req.body.password
        });

        // await data.save();
        res.redirect('/home');
    } catch (err) {
        res.render('../views/Auth/signup.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
    }
});

// Registration route
AuthRouter.get('/register', (req, res) => {
    res.render('../views/Auth/signup.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
});

AuthRouter.get('/home', async (req, res) => {
    const errorMessage = req.query.error || '';
    const result = await WebSite.find({}, { __v: 0 });
    const messagesData = await Reviews.find({}, { __v: 0 });

    const reviewsBySitePositive = {};
    const reviewsBySiteNegative = {};
    messagesData.forEach(review => {
        if (!reviewsBySitePositive[review.webSiteId]) {
            reviewsBySitePositive[review.webSiteId] = [];
        }
        if (!reviewsBySiteNegative[review.webSiteId]) {
            reviewsBySiteNegative[review.webSiteId] = [];
        }

        reviewsBySitePositive[review.webSiteId].push(review.positivePercentage);
        reviewsBySiteNegative[review.webSiteId].push(review.negativePercentage);
    });
    const averagePositivePercentage = {};
    const averageNegativePercentage = {};

    for (const webSiteId in reviewsBySitePositive) {
        const positiveReviews = reviewsBySitePositive[webSiteId];
        const negativeReviews = reviewsBySiteNegative[webSiteId];

        averagePositivePercentage[webSiteId] =
            positiveReviews.reduce((acc, val) => acc + val, 0) / 100 || 0;

        averageNegativePercentage[webSiteId] =
            negativeReviews.reduce((acc, val) => acc + val, 0) / 100 || 0;
    }

    res.render('../views/Home/index.ejs', { data: result, messages: messagesData, errorMessage, averagePositivePercentage, averageNegativePercentage });

})

AuthRouter.post('/login', (req, res) => {

    const { username, password } = req.body
    SignUpModel.findOne({ name: username, password: password })
        .then(async user => {
            if (user) {
                res.redirect('/home');
            }
            else {
                res.render('../views/Auth/login.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
            }
        }).catch(err => {
            res.render('../views/Auth/login.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
        });
})

// Logout route
AuthRouter.post('/logout', (req, res) => {
    res.render('../views/Auth/login.ejs', { layout: 'C:/Users/Niteesh.bv/OneDrive/Desktop/login Page/views/Layouts/unauth.layout.ejs' });
});

module.exports = AuthRouter;