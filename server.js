import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';
import { handleRegister } from './controllers/register';
import { handleSignin } from './controllers/signin';
import { handleParams } from './controllers/params';
import { handleImage, handleImageUrl } from './controllers/image';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('it is working'))
app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt))
app.post('/params', (req, res) => handleParams(req, res, db))
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))
app.put('/image', (req, res) => handleImage(req, res, db))
app.post('/imageurl', (req, res) => handleImageUrl(req, res))


app.listen(process.env.PORT || 3001, () => {
	console.log('app listening on port ${process.env.PORT}')
});

