//// importation du package mongoose ////
const mongoose = require("mongoose");

//// création du schéma mongoose schémaSauce////
const schemaSauces = mongoose.Schema({
    userId: {type: String, required: true},
    name: { type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array}
})

/// exportation du schéma mongoose schémaSauce ////
module.exports = mongoose.model("sauces", schemaSauces);
