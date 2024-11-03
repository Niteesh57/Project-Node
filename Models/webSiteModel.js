const { model, models } = require('mongoose');
const { mongoose } = require('./database');
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

module.exports = { WebSite };