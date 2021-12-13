//// importation de la base de donnée mongoose ////
const mongoose = require("mongoose");

//// création du schema user ////
const shemaUsersRegister = mongoose.Schema({
    email: {type : String, required: true},
    password: {type: String, required: true},
})

///// exportation du schema users ////
module.exports = mongoose.model("usersRegister", shemaUsersRegister);