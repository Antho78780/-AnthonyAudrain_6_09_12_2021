const mongoose = require("mongoose");

const shemaSauces = mongoose.Schema({
    name : {type : String, required : true},
    Manufacturer : {type : String, required : true},
    description : {type : String, required : true},
    image : {type : Buffer, required : true},
    ingredient : {type : String, required : true},
    heat : {type : Number, required : true},
})
module.exports = mongoose.model("sauces", shemaSauces)