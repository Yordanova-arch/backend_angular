const { Schema, model } = require('mongoose');


const shema = new Schema({
    text: { type: String, required: [true, 'All fields are required'] },
    createdAt: { type: Date, default: Date.now, required:true},
    author: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    themeId: { type: Schema.Types.ObjectId, ref: 'Thema', required:true}

});


module.exports = model('Post', shema)