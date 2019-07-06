var db = require('../models')

module.exports = function (app) {
  // Get all Tasks
  // app.get("/api/entries/:user/:type", function(req, res) {
  //   type = req.params.type

  //   db.Tasks.findAll({where: {userId: req.params.user}}).then(function(elements) {
  //     res.json(elements);
  //   });
  // });

  // Create a new Task
  app.post('/api/tasks', function (req, res) {
    console.log('request', req.body)
    db.Tasks.create(req.body).then(function (tasks) {
      res.json(tasks)
    }).catch(function (err) {
      console.log(err)
    })
  })

  // Update a Task by id
  app.put('/api/tasks/:id', function (req, res) {
    console.log("PUT " + req.body.urgent, req.params.id)
    db.Tasks.update({urgent: req.body.urgent}, { where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample)
    }).catch(function(err) {
      console.log(err, req.body)
    })
  })

  app.put('/api/body/:id', function(req, res) {
    db.Tasks.update({body: req.body.body}, {where: {id: req.params.id}})
  })

  // Delete a Task by id
  app.delete('/api/tasks/:id', function (req, res) {
    db.Tasks.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample)
    })
  })
}
