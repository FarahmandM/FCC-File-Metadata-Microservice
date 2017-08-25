/*
 * @author Farahmand Moslemi
 */

var express = require('express'),
  app = express(),
  multer = require('multer'),
  upload = multer(),
  port = process.env.PORT || 13000; // For local tests: http://localhost:13000/

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  res.render('index', {base: 'https://' + req.hostname});
});

app.get('/form', function(req, res) {
  app.set('view engine', 'pug');
  res.render('form');
});

app.post('/result', upload.single('myFile'), function(req, res, next) {
  if(req.file == undefined || req.file.size < 0)
    return res.json({error: 'Please select a file and then submit the form'});
  return res.json({size: req.file.size});
});
app.listen(parseInt(port));