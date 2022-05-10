const mongoose = require('mongoose');
const shortid = require('shortid');

const shortUrlModel =new mongoose.Schema({
    fullUrl: {
        type: String,
        required:true
    },
    shortUrl: {
        type: String,
        required: true,
        default:shortid.generate
    }
}, {
    timestamp:true
})

module.exports = mongoose.model('shortUrl', shortUrlModel);