//// importations du package express ///
const express = require("express");

//// imporation de la function router qui viens du package express ////
const router = express.Router();

const controllersUsers = require("../controllers/users");

//// création de la route post ////
router.post("/signup", controllersUsers.signup);
router.post("/login", controllersUsers.login);
  
//// exportation du router ////
  module.exports = router;