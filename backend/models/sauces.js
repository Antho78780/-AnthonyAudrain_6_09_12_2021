const mongoose = require("mongoose");

const shemaSauces = mongoose.Schema({
    sauces : {type : String},
    image : {type : String},
})
module.exports = mongoose.model("sauces", shemaSauces)