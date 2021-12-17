//// importation du package mongoose  ////
const mongoose = require("mongoose");

//// importation du package mongoose unique validator ////
const uniqueValidator = require("mongoose-unique-validator");

//// création du schema Register ////
const shemaUsersRegister = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
});

//// utilisation du package email unique ////
shemaUsersRegister.plugin(uniqueValidator);

///// exportation du schema Register ////
module.exports = mongoose.model("usersRegister", shemaUsersRegister);