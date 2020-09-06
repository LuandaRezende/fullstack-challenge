const moongose = require ('../database');

const TransactionSchema = new moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    title:{
        type: String,
    },
    value: {
        type: String,
        lowercase: true,
    },
    type: {
        type: String,
    },
    balance:{
        type: Object
    }
});

const transaction = moongose.model('transaction', TransactionSchema);
module.exports = transaction;