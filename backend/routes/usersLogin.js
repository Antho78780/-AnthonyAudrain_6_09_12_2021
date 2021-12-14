const express = require("express");

const router = express.Router();
const usersRegister = require("../models/usersRegister");

router.post("/", (req, res, next)=> {
   usersRegister.findOne({email : req.body.email})
   .then((usersRegister) => {
       if(!usersRegister) {
           return res.status(400).json({error : "utilisateur inexistant"})
       }
       res.status(200).json({message : "utilisateur connécté"});
       next();
   })
})


module.exports = router;
