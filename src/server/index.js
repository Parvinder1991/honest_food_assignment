const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
var fs = require('fs')
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// We go over all the directories in the controllers directory and file controller files
fs.readdirSync(path.join(__dirname, 'controllers')).forEach((directory) => {
    fs.readdirSync(path.join(__dirname, 'controllers', directory)).forEach(
      (file) => {
        if (file.substr(-3) === '.js') {
          const filePath = path.join(__dirname, 'controllers', directory, file);
          var route = require(filePath);
          route.controller(app);
        }
      }
    );
  });



app.use(express.static('dist'));



app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
