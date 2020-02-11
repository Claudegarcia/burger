// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require("../models")

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the burgers
  app.get("/api/burgers", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(allBurgers){
      res.json(allBurgers);
    })
  });

  // POST route for saving a new burger
  app.post("/api/burgers", function (req, res) {
    db.Burger.create({ burger_name: req.body.burger_name, devoured: false })
    .then(function (newBurger){res.json(newBurger);
    })
  });

  // PUT route for updating burgers.
  app.put("/api/burgers/:id", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Burger.update({ devoured: true }, { where: { id: req.params.id } })
    .then(function (devouredBurger){
      res.json(devouredBurger);
    })
  });
};