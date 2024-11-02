const mongoose = require('mongoose');

// Correct MongoDB connection URL
mongoose.connect("mongodb://127.0.0.1:27017/Demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


const SignUp = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: { 
        type: Number,
        required: true,
        min: 21
    },
    mobileNumber: {
        type: Number,
        required: true,
        length: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        length: 8
    },
    rePassword: {
        type: String,
        length: 8
    }
})
const SignUpModel = mongoose.model('SignUp', SignUp);

const WebSites = mongoose.Schema({
    webSiteName:{
        type: String,
        required: true,
        unique: true,
    },
    webSiteCategory:{
        type: String,
        required: true,
    },
    webSiteDescription:{
        type: String,
    },
    webSiteUrl:{
        type: String,
    },
    webSiteImage:{
        type: String,
    }
});

const WebSite = mongoose.model('Website', WebSites);

module.exports = { SignUpModel, WebSite }