const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const Transaction = require ('../models/transactions');
const User = require('../models/user');
router.use(authMiddleware);


router.get('/:id', async(req, res) => {

    try {
        const transactions = await Transaction.find({user: req.userId});
        let income = 0;
        let outcome = 0;

        transactions.forEach(el => {
            if (el.type === 'income'){
                income += parseInt(el.value);
            } else {
                outcome += parseInt(el.value);
            }
        });

        balance = {
            income: income,
            outcome: outcome,
            total: (income - outcome)
        }

        return res.status(200).send({ transactions, balance });
    } catch (error) {
        return res.status(400).send({error: 'Failed loading'});
    }

})

router.post('/register', async(req, res) => {

    try {
        const transaction = await Transaction.create(req.body);
        return res.status(200).send({ transaction });
    } catch (error) {
        return res.status(400).send({error: 'Failed create new transation'});
    }

})

module.exports = app => app.use('/transactions', router);