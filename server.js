const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000
const app = express();

app
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
  // This is the basic express session ({..}) initialization.
  .use(passport.initialize())
  // Initialize passport on every route call
  .use(passport.session())
  // Allow passport to use express sessions.

  .use((req, res, next) => {
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
  })

  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// app.get('/auth/github/callback',
//   passport.authenticate('github', {
//     failureRedirect: '/api-docs', session: false}),
//     (req, res) => {
//     req.session.user = req.user;
//     res.redirect('/');
//   }
// );

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.use('/', require('./routes'));

// error-handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Server error',
    error: err.message
  });
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
