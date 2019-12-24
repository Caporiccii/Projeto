const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get ('/', (req,res) =>{
 res.send('ok');   
});

app.listen(3000);