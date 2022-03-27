const Photo = require('../models/Photo');
const User = require('../models/User');


async function getAllPhotos() {
    const photo = await Photo.find({}).populate('author').lean();

    return photo;
}


async function createPhoto(PhotoData) {

    const photo = new Photo(PhotoData);

    await photo.save();

    return photo;

}

async function getOnePhotoById(id) {

    const photo = await Photo.findById(id).populate('author').lean();

    return photo;
}

async function getOnePhoto(id) {

    const photo = await Photo.findById(id);

    return photo;
}

async function deletePhoto(id, userId) {

    Promise.all([
        Photo.findOneAndDelete({id, userId}),
        User.findOneAndUpdate({userId}, {$pull: {photos:id}})
        ])
            .then(([deleteOne,_]) => {
               if(deleteOne) {
                   return deleteOne;
               } else{
                   throw new Error ('Not Allowed!')
               }
      }).catch(next);
    }

async function like(id, userId) {
    await Photo.updateOne({id}, { $addToSet: {usersLiked: userId}}, {new:true})
}


module.exports = {
    getAllPhotos,
    createPhoto,
    getOnePhotoById,
    deletePhoto,
    getOnePhoto,
    like
    
};