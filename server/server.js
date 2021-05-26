const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// filesystem
const {readdirSync} = require('fs');

// import routes
// const authRoutes = require('./routes/auth');

// app
const app = express();

// db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
	.then(() => console.log('DB CONNECTED'))
	.catch((err) => console.log(`DB CONNECTION ERROR: ${err}`));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

/* ROUTE MIDDLEWARES */
/*
    1. Sabay-sabay na basahin lahat ng files sa directory then return an array.
    2. Loop thru each file in /routes and return app.use('/api/routes/[file]')
*/ 
readdirSync('./routes').map(r => app.use('/api', require('./routes/' + r)))


// routes



const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log(`Server connected to ${PORT}`));
