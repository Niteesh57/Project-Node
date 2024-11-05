const { model, models } = require('mongoose');
const { mongoose } = require('./database');
const Review = mongoose.Schema({
    review: { type: String, required: true },
    webSiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'WebSite', required: true },
    sentiment: { type: String, enum: ['positive', 'negative', 'neutral'], default: 'neutral' },
    positivePercentage: { type: Number, default: 0 },
    negativePercentage: { type: Number, default: 0 }
});

const Reviews = mongoose.model('Review', Review);

module.exports = { Reviews };