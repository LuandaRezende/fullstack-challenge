const express = require ('express');
const User  = require ('../models/User');
const jwt = require ('jsonwebtoken');
const authConfig = require ('../config/auth.json');
const router = express.Router();

function generateToken( params = {}){
    return jwt.sign( params , authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (error) {
        return res.status(400).send({ error:'Failed' });
    }
});

router.post('/authenticate', async(req, res) => {
    const { email, password }= req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user){
        return res.status(400).send({ error: 'User not found'});
    }if (await password === user.password && email === user.email){
         res.send({ user, token: generateToken({ id: user.id }) });
        return res.status(200).send({ user, token });
    }else{
        return res.status(400).send({ error: 'Invalid' });
    };
})

module.exports = app => app.use('/auth', router);