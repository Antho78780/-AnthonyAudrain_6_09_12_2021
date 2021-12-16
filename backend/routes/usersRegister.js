//// importations de express ///
const express = require("express");
//// importation de bcrypt pour hash le mot de passe ////
const bcrypt = require("bcrypt");

//// imporation de la function rooter qui viens d'express ////
const router = express.Router();

//// importation du schéma register de mongoose ////
const usersRegister = require("../models/usersRegister");

//// création de la méthode post ////
router.post("/",(req,res,next) => {

  //// hachage du mot de passe ////
  bcrypt.hash(req.body.password, 5)
  .then((hash) => {
      const UsersRegister = new usersRegister({
        email : req.body.email,
        password : hash
      });
      UsersRegister.save();
      res.status(201).json({message : "utilisateur créer et enregistré dans la base de donnée"});
      next();
  })
  .catch((error) => res.status(404).json({error}))
})


//// exportation du router ////
  module.exports = router;