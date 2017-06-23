// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
// Define Express App
const app = express();


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cookieParser('foo'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'foo', // session secret
    cookie: {
        secure: false,
        expires: false,
        httpOnly: false
    },
    saveUninitialized: true,
    resave: false
}));
// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
require('./server/config/passport')(passport);

// Get our API routes
const goodReadsApi = require('./server/routes/goodReadsApi');
const authenticationRouter = require ('./server/routes/authenticationRouter')(passport);
const bookRouter = require('./server/routes/bookRouter');
const closestBooksRouter = require('./server/routes/closestBooksRouter');
const userRouter = require('./server/routes/userRouter');
// Set our api routes
app.use('/goodReadsApi', goodReadsApi);
app.use('/authenticate/', authenticationRouter);

app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/closestBook', closestBooksRouter);

app.get('/checkSession', (req, res) => {
  console.log(req.sessionID);
  res.send("okay");
});
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));