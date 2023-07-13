const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const { BlackModel } = require("../models/blacklist.model");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  try {
    const { email, password, Cpassword } = req.body;
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      return res.status(401).send({ msg: "user already register" });
    }

    if (password != Cpassword) {
      return res.status(401).send({ msg: "password are not same" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const hashCpassword = await bcrypt.hash(Cpassword, 10);
    const newUser = new UserModel({
      email,
      password: hashpassword,
      Cpassword: hashCpassword,
    });
    await newUser.save();
    res.status(200).send({ msg: "user register success" ,newUser});
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await UserModel.findOne({ email });

    if (!isUser) {
      return res.status(201).send({ msg: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, isUser.password);

    if (!isPasswordValid) {
      return res.status(401).send({ msg: "Wrong Credential" });
    }

    const token = jwt.sign({ userId: isUser._id }, "superman", {
      expiresIn: "1hr",
    });
    res.status(201).send({ msg: "login success", token });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRoute.get("/logout", async (req, res) => {
  try {
    const token = req.headers?.authorization;
    const existToken = await BlackModel.findOne({ token:token });
    if (existToken) {
      return res.status(401).send({ msg: "Token is already blacklisted" });
    }
    const blackListToken = new BlackModel({ token });
    await blackListToken.save();
    res.status(200).send({ msg: "token blacklisted" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { userRoute };
