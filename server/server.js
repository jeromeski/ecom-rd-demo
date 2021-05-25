const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

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

// route
app.get('/api', (req, res) => {
	res.json({
		data: 'You hit API'
	});
});

const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log(`Server connected to ${PORT}`));
