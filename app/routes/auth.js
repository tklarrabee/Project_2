var authController = require('../controllers/authcontroller.js')

module.exports = function (app, passport) {
  app.get('/register', authController.register)

  app.get('/login', authController.login)

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',

    failureRedirect: '/register'
  }

  ))

  app.get('/dashboard', isLoggedIn, authController.dashboard)

  app.get('/logout', authController.logout)

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) { return next() }

    res.redirect('/login')
  }

  app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',

    failureRedirect: '/login'
  }

  ))
}
