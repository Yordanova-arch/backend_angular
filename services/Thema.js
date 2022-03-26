const Thema = require('../models/Thema');
// const User = require('../models/User');


// to create thema- async, because database
async function createThema(themaData) {

    const thema = new Thema(themaData);


    await thema.save();

    return thema;

}

async function getAllThemas() {
    const themas = await Thema.find({}).lean();

    return themas
}


async function getOneThemaById(id) {
    const thema = await Thema.findById(id).lean();

    return thema;
}


module.exports = {
    createThema,
    getAllThemas,
    getOneThemaById
};