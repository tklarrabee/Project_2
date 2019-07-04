var db = require('../models')

module.exports = function(app) {
  // Get all Tasks
  app.get("/api/tasks", function(req, res) {
    db.Tasks.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new Task
  app.post("/api/tasks", function(req, res) {
    console.log("request", req.body)
    entries =  {"type": "task", "body": "work"}
    // console.log(req)
    // db.Tasks.bulkCreate( req.body, {returning: true}).then(function(tasks) {
      db.Tasks.create( req.body ).then(function(tasks) {
      
      res.json(tasks);
  }).catch(function(err) {
    console.log(err);
  })
})
  

  // Update a Task by id
  app.put("/api/tasks/:id", function(req, res) {
    db.Tasks.update({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  }); 
  
  // Delete a Task by id
  app.delete("/api/tasks/:id", function(req, res) {
    db.Tasks.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
