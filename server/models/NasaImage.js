const mongoose = require('mongoose');

const nasaImageSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    explanation: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    media_type:{
        type: String
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('NasaImage', nasaImageSchema);