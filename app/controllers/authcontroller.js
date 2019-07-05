var exports = module.exports = {}

exports.register = function (req, res) {
  res.render('register')
}

exports.login = function (req, res) {
  res.render('login')
}

exports.dashboard = function (req, res) {
  let userId = {id: req.user.id}
  res.render('dashboard', userId)
}

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/login')
  })
}
