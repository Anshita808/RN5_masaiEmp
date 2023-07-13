const mongoose =require("mongoose")

const employSchema = mongoose.Schema({
    firstname:{type:String,require},
    lastname:{type:String,require},
    email:{type:String,require},
    department:{type:String,require},
    salary:{type:Number,require},
});

const EmployModel = mongoose.model("employ",employSchema)

module.exports = {EmployModel}