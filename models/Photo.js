const {Photo, model} = require('mongoose');


const shema = new Schema({
    title: {type: String, required: [true, 'All fields are required'], minlength:4},
    imageUrl: {type: String, required: true, match: [/^https?/, 'Image must be valid URL'] },
    createdAt: {type:Date, default: Date.now,required:true},
    author: {type:Schema.Types.ObjectId, ref:'User',required:true},
    usersLiked: [{type:Schema.Types.ObjectId, ref: 'User', default:[]}]
 
});


module.exports = model('Photo', shema)