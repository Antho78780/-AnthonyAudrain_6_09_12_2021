//// importations de express ///
const express = require("express");
//// function router ////
const router = express.Router();

//// importation du schéma users ////
const usersRegister = require("../models/usersRegister");

router.post("/",(req,res,next) => {
    const UsersRegister = new usersRegister({
      ...req.body
    })
    console.log(req.body)
    UsersRegister.save()
    res.status(201).json({message : "Utilisateur enregistré"})
    next();
})

//// exportation du router ////
  module.exports = router;