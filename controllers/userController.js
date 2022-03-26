const router = require('express').Router();//this is factory function

//here use expressvalidator
const {body, validationResult} = require('express-validator');

const {register} = require('../services/User');

router.post('/register', 
// body('email', 'Invalid email').isEmail(),
// body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters').bail()
// .matches(/[a-zA-Z0-9]/).withMessage('Password may contain only english letters and digits'),//bail stop next check matches
// body('rePass').custom((value, {req}) => {
//     if(value !=req.body.password) {
//         throw new Error('Password don\'t match');
    // }
    // return true;
// }),
    async(req,res) => {
        
        //here we must chech for errors from body - express-validator
        // const {errors} = validationResult(req);//we take destructure object errors
        
        // const message = errors.map(e=>e.msg).join('\n');
        //we use try-catch, because we call to database
        try {
            // console.log(errors.value)
            // if(errors.length > 0) {
               
            //     throw new Error(message);
            // }
            
            const {email, password} = req.body;
            console.log(email, password)

            const userData = await register(email,password)
    
            
            res.json(userData);

        } catch(err) {
            console.log(err)
            
            // if (err.name === 'MongoError' && err.code === 11000) {
            //     res.send({ err });
            //    }
            // res.status(err.status || 400).json({message: [err.message.split('\n')]});
            res.send({ err })
        }
   
});

module.exports = router;  