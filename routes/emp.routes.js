const express = require("express");
const { EmployModel } = require("../models/employees.model");


const empRoute = express.Router();


empRoute.post("/employees",async(req,res)=>{
    try {
       const {firstname,lastname,email,department,salary} = req.body ;
       const newEmp = new EmployModel({firstname,lastname,email,department,salary});
       newEmp.save()
       res.status(200).send({msg:"employ created",newEmp})
    } catch (error) {
        res.send(error)
    }
});
empRoute.get("/employees", async (req, res) => {
  try {
    const employees = await EmployModel.find(); 
    res.status(200).send(employees); 
  } catch (error) {
    res.status(500).send(error); 
  }
});


module.exports ={empRoute}