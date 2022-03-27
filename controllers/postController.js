const { createOnePost, updatePost,deleteOnePost} = require('../services/Post');


function createPost(req,res,next) {

    const id = req.params.id;
    const userId = req.user._id;

    const data = {
        text: req.body.title,
        themeId:id,
        author: userId
    };

    try {
        const result= createOnePost(data,userId);
        res.status(200).json(result)
    }catch(err){
        // next?
        const message = parseError(err);
        res.status(err.status || 401).json({ message: message });
 
    }
}


function editPost(req,res,next)  {
     const {postId} = req.params;
     const {text} = req.body;
     const userId = req.user._id;

     try {
        const result= updatePost(postId,userId,text);
        res.status(200).json(result)
    }catch(err){
        // next?
        const message = parseError(err);
        res.status(err.status || 401).json({ message: message });
 
    }


}


function deletePost(req,res,next) {
    const {postId, themeId} = req.params;
    const userId = req.user._id;

    try {
        const result = deleteOnePost(postId,themeId,userId);
        // console.log(result)
        res.status(200).json(result);
    } catch (err) {

        const message = parseError(err);
        //  console.log(message)
        res.status(err.status || 401).json({ message: message});

    }

 
}




module.exports = {
    createPost,
    editPost,
    deletePost
} ;
