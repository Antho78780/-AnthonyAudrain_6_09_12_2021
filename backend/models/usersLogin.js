const mongoose = require("mongoose");

const schemaUsersLogin = mongoose.Schema({
    email : {type : String, required : true}, 
    password : {type : String, required : true}
})

module.exports = mongoose.model("usersLogin", schemaUsersLogin);