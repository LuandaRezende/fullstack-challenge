const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User = require ('../models/User');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        return res.send({ users });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading'});

    }
});

router.get('/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        return res.send(user);
    } catch (error) {
        return res.status(400).send({ error: 'Error loading'});
    }
});

router.get('/data/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        return res.send(user);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading'});
    }
});

router.put('/:userId', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(req.params.userId,
         {name,
         email,
         password
         }, {new: true})

        await user.save();

        return res.send({ user });
    } catch (error) {
        return res.status(400).send({ error:'Failed' });
    }
});


module.exports = app => app.use('/users', router);