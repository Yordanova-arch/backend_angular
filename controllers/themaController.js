const router = require('express').Router();//this is factory function

const {getAllThemas, createThema, getOneThemaById} = require('../services/Thema');

router.get('/', async(req,res) => {
    const data = await getAllThemas();
    res.json(data);
   
});

router.post('/', async(req,res) => {
    // console.log(req.body);
    const data = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    };
    // const data = {
    //     title: 'Test',
    //     description: 'test Didi',
    //     imageUrl: 'https://unsplash.com/photos/78A265wPiO4',
    // };
    
    const result = await createThema(data);
    // console.log(result)

    res.status(201).json(result);
   
});

router.get('/:id', async(req,res) => {
    const item = await getOneThemaById(req.params.id);
    // console.log(item);
    res.json(item);
   
});


module.exports = router; 