const {Schema, model} = require('mongoose');


const shema = new Schema({
    
    email: {type: String, required: [true, 'All fields are required']},
    hashedPassword: {type: String, required: [true, 'All fields are required']},

    themes: [{ type: Schema.Types.ObjectId, ref: 'Thema' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],

});


module.exports = model('User', shema);