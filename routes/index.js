var express = require('express');
var formidable = require('formidable');//It's a module for parsing form data, specially file uploads
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({
      uploadDir: './upload',
      keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    res.json(files)
  });

})

module.exports = router;
