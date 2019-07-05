var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var env = require('dotenv').config()
var exphbs = require('express-handlebars')

// Middleware 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

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
require("./app/routes/apiRoutes")(app);


// Sync Database
<<<<<<< HEAD
models.sequelize.sync({force: false}).then(function () {
=======
models.sequelize.sync().then(function () {
>>>>>>> a3896bec7d573cdd5a9eb9168ba9d6b88f2c5c21
  console.log(`\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷\n●○▷ Database is Online! ●○▷\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷`)
}).catch(function (err) {
  console.log(err, 'Something went wrong with the Database Update!')
})

app.listen(5000, function (err) {
  if (!err) { console.log(`\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷\n●○▷  Rapid Logger is Online!  ●○▷\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷`) } else console.log(err)
})

