const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    ConfirmPassword:{type:String,require:true},
})

const UserModel = mongoose.model("user",UserSchema);

module.exports = {UserModel}