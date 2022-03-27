const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');


// to create user- async, because database
async function register(email, password) {

    //check if user exists
    const existing = await getUserByEmail(email);

    if (existing) {
        const err = new Error('User with this email allready exists!');
        err.status = 409;
        throw err
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //store user
    const user = new User({
        email,
        hashedPassword
    });

    await user.save();

    return {
        accessToken: createToken(user),
        _id: user._id,
        email: user.email
    };

}



async function login(email, password) {

    //check if user exists
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorrect email or password!');

    }
    //check password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
        throw new Error('Incorrect email or password!');
    }


    return {
        accessToken: createToken(user),
        _id: user._id,
        email: user.email
    };

}



//search by email
async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i')

    const user = await User.findOne({ email: { $regex: pattern } });

    return user;

}



//create Token
function createToken(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, SECRET);
    return token;
}


module.exports = {
    register,
    getUserByEmail,
    login
};

