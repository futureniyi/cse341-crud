const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/', require('./routes'));

// error-handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Server error',
    error: err.message
  });
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`)
    });
  }
});
