var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var configDB = require('./server/config/database');

import dbHelper from './server/util/dbHelper';

//import product db
//dbHelper.loopFiles();

//static assets

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
}else{
    app.use(express.static('public'));
}

//runs Server and connects to database
var runServer = function(callback) {
    mongoose.Promise = global.Promise;
    mongoose.connect(configDB.DATABASE_URL, function(err, db) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(configDB.PORT, function() {
            console.log('Listening on localhost:' + configDB.PORT);
            if (callback) {
                callback();
            }
        });
        
    });
};


if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

app.get('/', (req, res) => {
    res.send('The server is running. please dont show this');
    //res.sendFile('index.html');
});

//express setup

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes
import routes from './server/routes/apiRoutes';

//set routes

app.use('/api',routes);

exports.app = app;
exports.runServer = runServer;