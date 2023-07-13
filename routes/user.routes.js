const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");

const UserRouter = express.Router();

UserRouter.post("/signup",async(req,res)=>{
    try {
        const {email,password,ConfirmPassword} = req.body;
        const isuserPresent = await UserModel.findOne({email});
        if(isuserPresent){
            return res.status(401).send({msg:"User is Already Registered."});
        }
        if(password != ConfirmPassword){
            return res.status(401).send({msg:"Both Password are not matched."})
        }
         const hashedPass = await bcrypt.hash(password,8)
         const hashedCPass = await bcrypt.hash(ConfirmPassword,8)
         const newUser = new UserModel({
            email,password:hashedPass,ConfirmPassword:hashedCPass,
         });
         await newUser.save();
         res.status(200).send({msg:"User Registered Successfully."});

    } catch (error) {
        res.status(400).send({msg:error});
    }
});

UserRouter.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body;

        const isuserPresent = await UserModel.findOne({email});
        if(!isuserPresent){
            return res.status(201).send({msg:"User is not Found"});
        }

        const isPassCorrect = await bcrypt.compare(password,isuserPresent.password);
        if(!isPassCorrect){
            return res.status(401).send({msg:"Wrong Credentials"});
        }
        const token = jwt.sign({userId:isuserPresent._id},"admin",{
            expiresIn:"1h",
        });
        res.status(201).send({msg:"login Successfull",token});
    } catch (error) {
        res.status(400).send(error);
    }
});

UserRouter.get("/logout",async(req,res)=>{
    try {
        const token = req.headers?.authorization;
        const existToken = await BlacklistModel.findOne({token:token});
        if(existToken){
            return res.status(401).send({msg:"Token is Already Blacklisted"});
        }
        const blacklistToken = new BlacklistModel({token});
        await blacklistToken.save();
        res.status(200).send({msg:"token is BlackListed."});
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = {UserRouter};