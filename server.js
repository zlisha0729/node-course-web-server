const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');  // key value pair

// middleware
app.use(express.static(__dirname + '/public'));

// use app.use to register middleware
// app.use takes only one function with 3 parameters
// without next() function, it won't fire up all the handlers. e.g. app.get()
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('hello express');
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to our website'
  });
});


app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
