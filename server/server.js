const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));

// if (process.env.LOGGING == "TRUE")
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.locals.siteName = 'Matcha';
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/', routes());
app.listen(port, () => {});
