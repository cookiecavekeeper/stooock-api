var express = require('express');
var cors = require('cors');
var routes = require('./routes');

var app = express();

app.use(cors());
app.use('/api', routes);

var server = app.listen(4500, function() {
    console.log('Express server listening on port ' + server.address().port);
});