const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const customer = require('./routes/customer');
const app = express();
const ENV = process.env.NODE_ENV || 'DEV';
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

if (ENV === 'DEV') {
  app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
  });
}

// routes
app.use('/customer', customer);

app.listen(PORT, () => console.info(`Server has started on port ${PORT}...`));
console.info(`Running enviroment: ${ENV}`);
