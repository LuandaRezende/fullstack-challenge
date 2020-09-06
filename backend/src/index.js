const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

require('./controllers/authController')(app);
require('./controllers/userController')(app);
require('./controllers/transationController')(app);

app.get('/', (req, res) => {
    res.send('Funcionou!')
});

app.listen(3333);