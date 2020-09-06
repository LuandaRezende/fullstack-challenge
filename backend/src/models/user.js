const moongose = require ('../database');

const UserSchema = new moongose.Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: true,    
    },
    password: {
        type: String,
        require: true,
    },
    transations: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'transactions',
        require: true,
    },
});

const user = moongose.model('user', UserSchema);
module.exports = user;