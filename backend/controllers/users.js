//// imporation du model UserRegister ////
const modelUsers = require("../models/users");

//// importation du package TOKEN ////
const jsonToken = require("jsonwebtoken");

//// importation du package bcrypt ////
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
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

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 5)
    .then(async(hash) => {
        const UsersRegister = new modelUsers({
          email : req.body.email,
          password : hash
        });
        await UsersRegister.save();
      res.status(201).json({message : "utilisateur créer et enregistré dans la base de donnée"});
    })
    .catch((error) => res.status(401).json({error}));
    console.log(req.body)
}