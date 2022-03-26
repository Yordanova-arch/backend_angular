const {Schema, model} = require('mongoose');


const shema = new Schema({
    title: {type: String, required: [true, 'All fields are required'], minlength:4},
    description: {type: String, required:true, minlength: 5},
    imageUrl: {type: String, required: true, match: [/^https?/, 'Image must be valid URL'] },
 
});


module.exports = model('Thema', shema)