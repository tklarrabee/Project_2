var express = require('express')
var app = express()
const expressLayouts = require('express-ejs-layouts') // dont need if handlbars work
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').config()
var exphbs = require('express-handlebars')

// var db = require('./models') *** PROBABLY DELETE ALSO

// For BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Middleware ** USING BODY PARSER...might delete this
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
// app.use(express.static('public'))

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

//  EJS                DELETE IF Handlebars works
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// //routes
// app.use('/', require('./app/routes/index'));

// For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/', function (req, res) {
  res.render('welcome')
})

// Models
var models = require('./app/models')

// Routes
var authRoute = require('./app/routes/auth.js')(app, passport)

// load passport strategies
require('./app/config/passport/passport.js')(passport, models.user)

// Sync Database
models.sequelize.sync().then(function () {
  console.log(`\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷\n●○▷ Database is Online! ●○▷\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷`)
}).catch(function (err) {
  console.log(err, 'Something went wrong with the Database Update!')
})

app.listen(5000, function (err) {
  if (!err) { console.log(`\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷\n●○▷  Rapid Logger is Online!  ●○▷\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷`) } else console.log(err)
})

// Routes                                        *** Might delete if handlebars works
// require("./routes/apiRoutes")(app);
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));

// var syncOptions = { force: false }                        // DO WE NEED THIS???

// If running a test, set syncOptions.force to true       OR THIS??
// clearing the `testdb`   "comment"

// if (process.env.NODE_ENV === 'test') {
//   syncOptions.force = true
// }

// module.exports = app   // DONT THINK WE NEED THIS?
