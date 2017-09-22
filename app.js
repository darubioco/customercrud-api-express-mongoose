const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');

const indexRouter = require('./routes/index.router');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_URI);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', indexRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  winston.error(err.message || 'Unexpected error');
  res.status(err.status || 500).send({ message: err.message });
});

app.use((req, res) => {
  res.status(404).send({
    message: `${req.method} ${req.url} not found`,
  });
});

app.listen(process.env.PORT, () => {
  winston.info(`Application listening on port ${process.env.PORT}`);
});
