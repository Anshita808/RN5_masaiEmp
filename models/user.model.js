const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    Cpassword:{type:String,require:true},
})



const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}