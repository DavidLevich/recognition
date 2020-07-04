const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
  	host: '127.0.0.1',
  	user: 'david',
    password: '',
    database: 'smart-brain'
  },
});


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.json('server is live')});
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleGetProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

//const port = process.env.PORT
//const DATABASE_URL = process.env.DATABASE_URL
app.listen(port=3000, () => {
	console.log(`app is running on port ${port}`);
})


/*
/ --> GET: this is working
/signin --> POST: success/fail
/register --> POST: user
/profile/:userId --> GET: user
/image --> PUT: user
*/

