const {getOneThema} = require('../services/Thema')

module.exports = (paramName = 'id') => async (req,res,next) =>{
    const id = req.params[paramName];
    try {
        const data = await getOneThema(id);
        req.data=data;
        next();
    }catch (err) {
        res.status(404).json({ message: 'Thema does not exist' });
    }
   

}