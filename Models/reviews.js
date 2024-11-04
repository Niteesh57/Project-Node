const { model, models } = require('mongoose');
const { mongoose } = require('./database');
const Review = mongoose.Schema({
    review: { type: String, required: true },
    webSiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'WebSite', required: true }
});

const Reviews = mongoose.model('Review', Review);

module.exports = { Reviews };