//// imporation du schéma model UserRegister ////
const modelUsers = require("../models/users");

//// importation du package TOKEN ////
const jsonToken = require("jsonwebtoken");

//// importation du package bcrypt ////
const bcrypt = require("bcrypt");

//// function pour pour que l'utilisateur se connecte à son compte sur le site web ////
exports.login = (req, res) => {
    console.log("<--- compte utilisateur ---- >")
    modelUsers.findOne({email : req.body.email})
    .then((modelUsers) => {
        if(!modelUsers) {
            return res.status(404).json({error : "compte introuvable"});
        }
        else {
             bcrypt.compare(req.body.password, modelUsers.password)
             .then((control) => {
                 if(control) {
                     return res.status(200).json({
                         message : "compte connecté",
                         userId : modelUsers._id,
                         token : jsonToken.sign(
                             {userId : modelUsers._id},
                             process.env.DB_TOKEN,
                             {expiresIn : "12h"}
                         )
                     });
                 }
                 else {
                     return res.status(401).json({error : "mot de passe incorrect"})
                 }
             })
             .catch((error) => res.status(401).json(error))
        }
    })
    console.log(req.body)
}

//// function pour que l'utilisateur s'enregistre sur le site web ////
exports.signup = (req, res) => {
    console.log("<---- Enregistration compte utilisateur ---->")
    bcrypt.hash(req.body.password, 5)
    .then((hash) => {
        const UsersRegister = new modelUsers({
          email : req.body.email,
          password : hash
        });
        UsersRegister.save()
      .then(() => res.status(201).json({message : "utilisateur créer et enregistré dans la base de donnée"}))
      .catch((error) => res.status(400).json({error}))
    })
    .catch((error) => res.status(401).json({error}));
    console.log(req.body)
}