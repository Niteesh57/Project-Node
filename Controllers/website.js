const Express = require('express');
const multer = require('multer'); // Ensure multer is imported
const WebSiterouter = Express.Router();
const upload = multer({ dest: 'public/images/' }); // Specify the destination for uploaded files


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


WebSiterouter.get('/creation', (req, res) => {
    const oldValues = {};
    const errors = {};
    res.render('Blogs/create.ejs', { title: 'Create Web Site', oldValues, errors });
});
// upload.single('web_site_image')

WebSiterouter.post('/submit', upload.single('web_site_image'), async (req, res) => { // Use multer's middleware here
    const oldValues = {};
    const errors = {};
    
    // Destructure fields from the request body
    const { web_site_name, web_site_category, web_site_description, web_site_url } = req.body;
    console.log(req.body);
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
    if (typeof web_site_description !== 'string' || web_site_description.length < 30 || web_site_description.length > 300) {
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
        console.log(errors, oldValues);

        // Re-render the form with error messages and old values
        return res.render('Blogs/create.ejs', { errors, oldValues });
    }

    // Process the valid data here (e.g., save to database)
    res.send('Form submitted successfully!');
});

module.exports = { WebSiterouter };

// const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//         }
//         const webSite = new WebSite({
//             name: name,
//             categary: categary,
//             description: description,
//             url: url,
//             image: image
//             });
//             webSite.save()
//             .then((data) => {
//                 res.redirect('/');
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                     res.status(500).send('Error saving data');
//                     });

module.exports = { WebSiterouter }