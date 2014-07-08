'use strict';

var express = require('express'),
  app = express();

app.get('/count', function(req, res) {
  console.log('count method has been called');
  res.send({
    count: 1200
  });
});

app.listen(3000, function() {
  console.log('App started');
});
