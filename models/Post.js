const { Schema, model } = require('mongoose');


const shema = new Schema({
    text: { type: String, required: [true, 'All fields are required'] },
    createdAt: { type: Date, default: Date.now},
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    themeId: { type: Schema.Types.ObjectId, ref: 'Thema'}

});


module.exports = model('Post', shema)