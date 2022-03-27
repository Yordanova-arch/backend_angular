const Thema = require('../models/Thema');



// to create thema- async, because database
async function createThema(themaData) {

    const thema = new Thema(themaData);


    await thema.save();

    return thema;

}

async function getAllThemas() {
    const themas = await Thema.find({}).populate('author').lean();

    return themas
}


async function getOneThemaById(id) {
    const thema = await Thema.findById(id).populate({
        path: 'posts',
        populate: {

            path: 'author'
        },
        options: 10,
    }).lean();

    return thema;
}

async function getOneThema(id) {
    const thema = await Thema.findById(id).lean();

    return thema;
}


async function update(id, userId, themaData) {
    const result = await Thema.findOneAndUpdate({id, userId}, themaData, {new: true});
    
    return result;

}


module.exports = {
    createThema,
    getAllThemas,
    getOneThemaById,
    getOneThema,
    update,
    
};