//// importation du package express ///
const express = require("express");

//// importation du package jsonWebToken ////
const jsonToken = require("jsonwebtoken");

///// création d'une clé de génération ////
const cleGeneration = "9b4ADBUVGYQffAX9USRQmbVzn8sR6KQ3993bh5QHUv5EbWb5p5n274wbh6fttX294z94dCV3sDJhjp3V8Tx9AyYR9F96fqSYh2TEeU4BnuU88Gtw9BGJ685zx6cYzE9K5g7u8p96vQ3jqK5Z2ThFYk8J8y5S3AB4m87sgs2xbps4G3J7XfeDnT84xE9DsqQ4a6x6P7BEXQy6eDmPk4MG7J4XR5iuua4g5p2mt8SzVgV4RKpWCvCH5NA4h3Tj8dFEec94MJni57kk535G7eb48iY93ZmuEzUZ7242LSqcnbEYjfm8GzuUVdwg8FGR5QzX58sg9aZ7pu74pvNBhS73YRbh9Hp5jsErfEB92X4TegPEgK35Y4CaQLK57475249U5AAzr8U8Tf6SCtGjKUq9K856hpMA3eD685aqgbz483wQ42shV99Fy32S6xX87m9aEr5JR2Dg5xt7a92ASukUR6Y9RaQ6k36r87kp29Bww9z7B83gXEuKVh7yQh95Xn95";

//// importation de la function router qui viens du package express ///
const router = express.Router();

//// importation du schéma qui est dans model ///
const usersRegister = require("../models/usersRegister");

//// création de de la route post ////
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
                token : jsonToken.sign(
                    {userId : usersRegister._id},
                    cleGeneration,
                    {expiresIn : "12h"}
                )
            });
       }
   })
})



//// exportation du module router ///
module.exports = router;
