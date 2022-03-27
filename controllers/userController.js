const router = require('express').Router();//this is factory function

const validator = require('validator')

const { register, login } = require('../services/User');

router.post('/register', async (req, res) => {
    const validationResult = validateSignupForm(req.body)
    // console.log(req.body);
    
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    try {

        const { email, password } = req.body;
        const userData = await register(email, password)

        res.status(200).json(userData);

    } catch (err) {
        res.status(err.status || 400).json({
            message: err.message.split('\n'),
            success: false,
            errors: err.message
        });

    }

});


router.post('/login', async (req, res) => {
    const validationResult = validateLoginForm(req.body)
    // console.log(req.body);
    
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    try {

        const { email, password } = req.body;
        const userData = await login(email, password)

        res.status(200).json(userData);

    } catch (err) {
        res.status(401).json({
            message: err.message.split('\n'),
            success: false,
            errors: err.message
        });

    }

});


router.post('/logout', (req, res) => {
    res.status(204).end();


});



function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    // console.log(payload)

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.'
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
        isFormValid = false;
        errors.password = 'Password must have at least 4 characters.'
    }

    if (!payload || typeof payload.rePass !== 'string' || payload.rePass.trim().length < 4) {
        isFormValid = false;
        errors.password = 'rePass must have at least 4 characters.'
    }

    if (payload.password !== payload.rePass) {
        isFormValid = false;
        message = 'Password don\'t match'
    }

    if (!isFormValid) {
        isFormValid = false;
        message = 'Please Check the form for errors.'
    }
    
    return {
        success: isFormValid,
        errors,
        message
    }
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    // console.log(payload)

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.'
    }


    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your password.'
    }

   
    if (!isFormValid) {
        isFormValid = false;
        message = 'Please Check the form for errors.'
    }
    
    return {
        success: isFormValid,
        errors,
        message
    }

}


module.exports = router;  