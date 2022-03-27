const router = require('express').Router();

const { getAllPhotos, createPhoto, getOnePhotoById, deletePhoto, getOnePhoto, like} = require('../services/Photo');

const { isAuth } = require('../middlewares/guards');

const { parseError } = require('../utilis');



router.get('/', async (req, res) => {
    const data = await getAllPhotos();
    res.json(data);

});

router.post('/',isAuth(), async (req, res) => {
    
    const data = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        author: req.user._id
    };
    try {
        const result = await createPhoto(data);
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
        const item = await getOnePhotoById(id);
        
        res.status(200).json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(404).json({ message: 'Thema does not exist' });

    }

});

router.delete('/:id', isAuth(), async (req, res) => {
    
    try {
        const result = deletePhoto(req.params.id, req.user._id);
        // console.log(result)
        res.status(200).json(result);
    } catch (err) {

        const message = parseError(err);
        //  console.log(message)
        res.status(err.status || 401).json({ message: message});

    }

});

router.put('like/:id', isAuth(), async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    const photo = await getOnePhoto(id);

    if (!photo) {
        return res.status(404).json({message:'Photo does not exist'})
    }
    try{
        await like(id,userId);
        res.status(200).json({message: 'Liked successful!'});

    }catch(err) {
        
        res.status(403).json({ message: 'Already liked'});
    }
    
    

});



module.exports = router; 