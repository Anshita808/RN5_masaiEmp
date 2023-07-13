const express = require("express");
const { EmployeeModel } = require("../models/employees.model");


const employeeRouter = express.Router();

employeeRouter.post("/employees",async(req,res)=>{
    try {
        const {firstname,lastname,email,department,salary} = req.body;
        const newEmp = new EmployeeModel({firstname,lastname,email,department,salary});
        newEmp.save();
        res.status(200).send({msg:"employee Created suceessfully.",newEmp})
    } catch (error) {
        res.send(error)
    }
});
employeeRouter.get("/employees", async(req,res)=>{
    try {
        const employees = await EmployeeModel.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = {employeeRouter}

