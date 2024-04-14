

const express = require('express'); //express est un framework qui permet de coder plus rapidement
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes.js');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use('/api/user',userRoutes);

//
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});