const router = require('express').Router();//this is factory function

const { getAllThemas, createThema, getOneThemaById, update} = require('../services/Thema');
const {createPost, editPost, deletePost} = require('../controllers/postController')

const { isAuth } = require('../middlewares/guards');

const { parseError } = require('../utilis');
const preload = require('../middlewares/preload');


router.get('/', async (req, res) => {
    const data = await getAllThemas();
    res.json(data);

});

router.post('/',isAuth(), async (req, res) => {
    
    const data = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        author: req.user._id
    };
    try {
        const result = await createThema(data);
        // console.log(result)
        res.status(201).json(result);
    } catch (err) {

        const message = parseError(err);
        //  console.log(message)
        res.status(err.status || 400).json({ message: message });

    }

});

router.get('/:id', isAuth(), async (req, res) => {
    const id = req.params.id
    try {
        const item =  getOneThemaById(id);
        
        res.status(200).json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(404).json({ message: 'Thema does not exist' });

    }

});

router.put('/:id', isAuth(), async (req, res) => {
    
    try {
        const result = await update(req.params.id, req.user._id, req.body);
        // console.log(result)
        res.status(200).json(result);
    } catch (err) {

        const message = parseError(err);
        //  console.log(message)
        res.status(err.status || 401).json({ message: message});

    }

});


router.post('/:id/posts',isAuth(),createPost);
router.put('/:themeId/posts/:postId',isAuth(),editPost);
router.delete('/:themeId/posts/:postId',isAuth(),deletePost);





module.exports = router; 