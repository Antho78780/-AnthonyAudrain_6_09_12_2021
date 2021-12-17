//// importations du package express ///
const express = require("express");

//// importation du package bcrypt pour hash le mot de passe ////
const bcrypt = require("bcrypt");

//// imporation de la function router qui viens du package express ////
const router = express.Router();

//// importation du schéma register de mongoose ////
const usersRegister = require("../models/usersRegister");

//// création de la route post ////
router.post("/",(req,res,next) => {
  //// hachage du mot de passe ////
    bcrypt.hash(req.body.password, 5)
    .then(async(hash) => {
        const UsersRegister = new usersRegister({
          email : req.body.email,
          password : hash
        });
        await UsersRegister.save();
      res.status(201).json({message : "utilisateur créer et enregistré dans la base de donnée"});
    })
    .catch((error) => res.status(404).json({error}))
})


//// exportation du router ////
  module.exports = router;