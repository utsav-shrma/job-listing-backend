const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcrypt');
require("dotenv").config();
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const jwtKey=process.env.SECRET_KEY;

authRouter.post("/register", async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

    if (!(name && email && mobile && password)) {
      return res.status(400).json({ message: "bad request" });
    }

    let isExistingUser = await User.findOne({ email: email });

    if (isExistingUser) {
      return res.status(409).json({ message: "user exists" });
    }

    //add mobile and email validation using regex

    let hashedPassword=await bcrypt.hash(password, 10);
    
    // let newUser = await User.create({ name, email, mobile, password:hashedPassword }); //create combines both steps
    let newUser = new User({ name, email, mobile, password:hashedPassword });
    await newUser.save();
    let token = await jwt.sign({ userId: newUser._id },  jwtKey);
    res.status(200).json({jwt:token});
  } catch (error) {
    console.log(error);
  }
});

module.exports = authRouter;
