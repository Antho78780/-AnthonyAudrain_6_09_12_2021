//// importations du package express ///
const express = require("express");

const auth = require("../middleware/auth");

//// imporation de la function router qui viens d'express ////
const router = express.Router();

//// importation du controllers Utilisateur ///
const controllersUsers = require("../controllers/users");

//// utilisation de router pour créer les endPoints ////
router.post("/signup", controllersUsers.signup);
router.post("/login",  controllersUsers.login);
  
//// exportation du module router ////
  module.exports = router;