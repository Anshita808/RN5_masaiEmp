const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    firstname:{type:String,require},
    lastname:{type:String,require},
    email:{type:String,require},
    department:{type:String,require},
    salary:{type:String,require},
});

const EmployeeModel = mongoose.model("employee",EmployeeSchema)

module.exports = {EmployeeModel}