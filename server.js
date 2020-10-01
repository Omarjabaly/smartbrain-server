const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const params = require('./controllers/params');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Omaros123#',
    database : 'smartbraindb'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('it is working'))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/params', (req, res) => params.handleParams(req, res, db))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleImageUrl(req, res))


app.listen(process.env.PORT || 3001, () => {
	console.log('app listening on port ${process.env.PORT}')
});

