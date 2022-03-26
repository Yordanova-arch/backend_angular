const {Schema, model} = require('mongoose');


const shema = new Schema({
    
    email: {type: String, required: [true, 'All fields are required']},
    hashedPassword: {type: String, required: [true, 'All fields are required']},
    

});


module.exports = model('User', shema);