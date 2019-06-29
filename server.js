<<<<<<< HEAD
require('dotenv').config()
var express = require('express')
var exphbs = require('express-handlebars')
=======
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var expressLayouts = require('express-ejs-layouts');
>>>>>>> 4f03b878f34d48d1dd1da4acab1f0224962218b4

var db = require('./models')

var app = express()
var PORT = process.env.PORT || 3000

// EJS.
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

// Handlebars
<<<<<<< HEAD
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')
=======
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");
>>>>>>> 4f03b878f34d48d1dd1da4acab1f0224962218b4

// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

var syncOptions = { force: false }

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    )
  })
})

module.exports = app
