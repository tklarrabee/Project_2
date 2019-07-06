var db = require('../models')
var exports = module.exports = {}

exports.register = function (req, res) {
  res.render('register')
}

exports.login = function (req, res) {
  res.render('login')
}

exports.dashboard = function (req, res) {
  db.Tasks.findAll({ where: { userId: req.user.id } }).then(function (task) {
    let handleObject = {
      id: req.user.id,
      task: task
    }
    res.render('dashboard', handleObject)
  })
}

exports.logout = function (req, res) {
  // eslint-disable-next-line handle-callback-err
  req.session.destroy(function (err) {
    res.redirect('/login')
  })
}
