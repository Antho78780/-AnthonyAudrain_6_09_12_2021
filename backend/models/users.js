//// importation du package mongoose  ////
const mongoose = require("mongoose");

//// importation du package mongoose unique validator ////
const uniqueValidator = require("mongoose-unique-validator");

//// création du schema mongoose Register ////
const shemaUsers = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
});

//// utilisation du package email unique ////
shemaUsers.plugin(uniqueValidator);

///// exportation du schema Register ////
module.exports = mongoose.model("users", shemaUsers);