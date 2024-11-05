const Express = require('express');
const multer = require('multer'); // Ensure multer is imported
const WebSiterouter = Express.Router();
const { WebSite } = require('../Models/webSiteModel')
const { Reviews } = require('../Models/reviews');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const path = require('path');



const app = Express();
app.use(Express.static('public'));
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Specify the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to avoid duplicates
    }

});

const upload = multer({ storage: storage }); // Specify the destination for uploaded files



WebSiterouter.get('/creation', (req, res) => {
    const oldValues = {};
    const errors = {};
    var errorMessage;
    res.render('Blogs/create.ejs', { title: 'Create Web Site', oldValues, errors, errorMessage });
});
// upload.single('web_site_image')

WebSiterouter.post('/submit', upload.single('web_site_image'), async (req, res) => { // Use multer's middleware here
    const oldValues = {};
    const errors = {};
    var errorMessage;
    // Destructure fields from the request body
    const { web_site_name, web_site_category, web_site_description, web_site_url } = req.body;
    const web_site_image = req.file; // Get the uploaded file

    // Validate web_site_name
    if (typeof web_site_name !== 'string' || web_site_name.length < 5 || web_site_name.length > 20) {
        oldValues.web_site_name = web_site_name;
        errors.web_site_name = 'Name must be between 5 and 20 characters long and unique';
    } else {
        oldValues.web_site_name = web_site_name; // Capture valid name as well
    }

    // Validate web_site_category
    if (typeof web_site_category !== 'string' || web_site_category.length < 5 || web_site_category.length > 10) {
        oldValues.web_site_category = web_site_category;
        errors.web_site_category = 'Category must be between 5 and 10 characters long and a string';
    } else {
        oldValues.web_site_category = web_site_category; // Capture valid category as well
    }

    // Validate web_site_description
    if (typeof web_site_description !== 'string' || web_site_description.length < 30 || web_site_description.length > 50) {
        oldValues.web_site_description = web_site_description;
        errors.web_site_description = 'Description must be between 30 and 300 characters long and a string';
    } else {
        oldValues.web_site_description = web_site_description; // Capture valid description as well
    }

    // Validate web_site_url
    if (typeof web_site_url !== 'string' || web_site_url.length < 5 || web_site_url.length > 100) {
        oldValues.web_site_url = web_site_url;
        errors.web_site_url = 'URL must be between 5 and 100 characters long and a string';
    } else {
        oldValues.web_site_url = web_site_url; // Capture valid URL as well
    }

    // Validate web_site_image
    if (!web_site_image) {
        errors.web_site_image = 'An image file must be uploaded';
    } else {
        // If you want to validate the image's name or other properties, you can do so here
        // For example, check the file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(web_site_image.mimetype)) {
            errors.web_site_image = 'Only JPEG, PNG, and GIF files are allowed';
        }
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {

        // Re-render the form with error messages and old values
        return res.render('Blogs/create.ejs', { errors, oldValues, errorMessage });
    }

    const website = new WebSite({
        webSiteName: web_site_name,
        webSiteCategory: web_site_category,
        webSiteDescription: web_site_description,
        webSiteUrl: web_site_url,
        webSiteImage: req.file ? req.file.path : null
    })
    // Save the website to the database
    website.save()
    .then(() => {
        res.redirect('/home');
    }).catch(err => {
        var errorMessage = "Error saving website: " + err.message;
        res.status(500).render('Blogs/create.ejs', { title: 'Create Web Site', oldValues, errors, errorMessage });
    });
});

WebSiterouter.post('/review', async (req, res) => {
    try {
        // Analyze the review text for sentiment
        const analysis = sentiment.analyze(req.body.review);

        // Determine sentiment category and percentage
        let sentimentCategory;
        let positivePercentage = 0;
        let negativePercentage = 0;

        if (analysis.score > 0) {
            sentimentCategory = 'positive';
            positivePercentage = Math.min(100, (analysis.score / analysis.tokens.length) * 100); // Basic normalization
        } else if (analysis.score < 0) {
            sentimentCategory = 'negative';
            negativePercentage = Math.min(100, Math.abs((analysis.score / analysis.tokens.length) * 100));
        } else {
            sentimentCategory = 'neutral';
        }

        // Create a new review with sentiment analysis data
        const review = new Reviews({
            review: req.body.review,
            webSiteId: req.body.webSiteId,
            sentiment: sentimentCategory,
            positivePercentage: positivePercentage,
            negativePercentage: negativePercentage
        });

        await review.save();
        res.redirect('/home');

    } catch (err) {
        const errorMessage = "Error saving review: " + err.message;
        // Use a query parameter to pass the error message
        res.redirect(`/home?error=${encodeURIComponent(errorMessage)}`);
    }
});

module.exports = { WebSiterouter };