const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const customerRoute = require('./routes/customer');
const loginRoute = require('./routes/login');
const serviceproviderRoute = require('./routes/serviceprovider');
const app = express();
const ENV = process.env.NODE_ENV || 'DEV';
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

// Set up a whitelist and check against it to CORS:

// var whitelist = ['http://localhost:3000'];
// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// use CORS
// app.use(cors(corsOptions));

if (ENV === 'DEV') {
  app.use(cors());
  app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
  });
}

// routes
app.use('/customer', customerRoute);
app.use('/login', loginRoute);
app.use('/serviceprovider', serviceproviderRoute);

app.listen(PORT, () => console.info(`Server has started on port ${PORT}...`));
console.info(`Running enviroment: ${ENV}`);
