const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    destination: {
        type: String,
        required: true
    },
    shortenedLink: {
        type: String,
        required: true
    },
}, { timestamps: true});

module.exports = mongoose.model('Link', linkSchema);