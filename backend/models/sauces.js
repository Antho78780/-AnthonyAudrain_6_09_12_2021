
const mongoose = require("mongoose");

const schemaSauces = mongoose.Schema({
    name : { type: String},
    manufacturer : {type: String},
    description : {type: String},
    mainPepper : {type: String},
    imageUrl : {type: String},
    heat : {type: Number},
    likes : {type: Number},
    dislikes : {type: Number},
    usersLiked : {type: Array},
    usersDisliked : {type: Array}
})

module.exports = mongoose.model("sauces", schemaSauces);
