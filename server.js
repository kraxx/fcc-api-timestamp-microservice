var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.set('views', 'views');
var port = app.get('port');

app.use(express.static('public'));
app.use(require('./routes/index'));

app.get('/:datestring', function (req, res) {
    var dateObj = dateConverter(new Date(req.params.datestring));
    if (req.params.datestring) console.log(dateObj);
    res.send(dateObj);
});

function dateConverter(data) {
    return data.toDateString() === 'Invalid Date' ? JSON.stringify({'unix':null, 'natural':null})
    : JSON.stringify({'unix':data.getTime(), 'natural':data.toDateString()});
}

app.listen(port, function () {
  console.log('Timestamp microservice listening on port ' + port);
})