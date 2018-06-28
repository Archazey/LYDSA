const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

//cors
app.use(cors())

// body-parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// start server
const port = 3005;
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
    console.log('Listening on port ' + port);
});

// routes
var routes = require('./routes/login.route');
app.use('/', routes);
routes = require('./routes/register.route');
app.use('/', routes)
routes = require('./routes/profile.route');
app.use('/', routes)


