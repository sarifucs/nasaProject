const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email:{
        type: String,
        required:true,
        // match: [/\S+@\S+\.\S+/]
    },
    nasaImages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NasaImage'
    }]
});

module.exports = mongoose.model('User', userSchema);