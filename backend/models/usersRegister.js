//// importation de la base de donnée mongoose ////
const mongoose = require("mongoose");

//// création du schema Register ////
const shemaUsersRegister = mongoose.Schema({
    email: {type : String, required: true},
    password: {type: String, required: true},
})

///// exportation du schema Register ////
module.exports = mongoose.model("usersRegister", shemaUsersRegister);