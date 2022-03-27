const Post = require('../models/Post');
const User = require('../models/User');
const Thema= require('../models/Thema');



async function createOnePost(PostData, userId) {

    const post = new Post(PostData);

    Promise.all([
        post.save(),
        User.findOneAndUpdate({ userId }, { $pull: { posts: id } })
    ]);

    return post;
}




async function getOnePost(id) {

    const post = await Post.findById(id);

    return post;
}


async function updatePost(id, userId, PostText) {
    const result = await Post.findOneAndUpdate({ id, userId }, { text: PostText }, { new: true });

    return result;

}

async function deleteOnePost(postId, themeId, userId) {


    Promise.all([
        Post.findOneAndDelete({ postId, userId }),
        User.findOneAndUpdate({ userId }, { $pull: { posts: postId } }),
        Thema.findOneAndUpdate({themeId}, { $pull: { posts: postId } })
    ])
        .then(([deleteOne, _, __]) => {
            if (deleteOne) {
                return deleteOne;_
            } else {
                throw new Error('Not Allowed!')
            }
        }).catch(next)

}



module.exports = {
    createOnePost,
    getOnePost,
    deleteOnePost,
    updatePost

};