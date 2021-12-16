//// importation de express ///
const express = require("express");
const jsonToken = require("jsonwebtoken");
//// importation de la function router qui viens d'express ///
const router = express.Router();

//// importation du schéma register de mongoose ///
const usersRegister = require("../models/usersRegister");

//// création de de la méthode post ////
router.post("/", (req, res, next)=> {
   usersRegister.findOne({email : req.body.email})
   .then((usersRegister) => {
       if(!usersRegister) {
           res.status(404).json({error : "compte introuvable"})
       }
       else {
          res.status(200).json({
              message : "compte connecté",
              userId : usersRegister._id,
              token : "token"  
          })
       }
   })
})


//// exportation du module router ///
module.exports = router;
