const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bycrpt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser=require("../middleware/fetchuser")
const jwtsecret = "mynameisShouryaSinha";
//Route 1:- Create a user using:POST "/api/auth/createuser" :-no login required
Router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password of minimum length 5").isLength({
      min: 5,
    }),
  ],//here we add limitation during the time of creating a user like name must be of minimum 3 character ,email must be an valid email and password length is must be of 5 character 
  async (req, res) => {
    let success=false; 
    //if there are errors it returns bad request and the error
    const errors = validationResult(req);

    if (!errors.isEmpty()) { //if error is not empty which means the error is present then send a bad request
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //Check wheater the user  with the same email exixts or not
      let user = await User.findOne({ email: req.body.email });
console.log ("This email checking line is execute")
      //if application get the user with same email already exists in the database then return a bad request and show error of "sorry user with the same email already exists"
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry user with the same email already exists" });
      }
      const salt = await bycrpt.genSalt(10); //here we generate salt which will add to password to make it more secure.This will generate 10 character

      let secPassword = await bycrpt.hash(req.body.password, salt); //here we mix the salt with our password and generate hash of password 

      user = await User.create({ //.create function is used to create and save it in database

        //taking the value from req.body and save it in object properties
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
console.log(" here we send req")
      

      //nested object
      const data = { //creating an object name data
        user: {
          id: user.id,  //storing user id of mongodb database 
        },
      };
      const authtoken = jwt.sign(data, jwtsecret); //here creating the authentication token  by the function .sign() this function take data by which a user uniquely identified and a secret key which is given by the developer and this function generate the key by adding sign in the token itself.

      // res.json(user)
      success=true
      console.log("code is here")
      res.status(200).json({ success, authtoken }); // Use res.status().json() instead

      console.log("code is here now")
    } catch (error) {
      console.error(error.message);
      success=false
      res.status(500).json({ success, error: 'Internal Server Error' });
    }
  }
);

//Route 2:- Authenticate the user using POST :"/api/auth/login" no login required

Router.post(
  "/login",
  //here we  make validation on email and password during the time of login .email must be an valid email and password donot have null or blank
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors it returns bad request and the error
let success=false; 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //using destructuring get email and password from req.body
    // console.log(req.body);
    try {
      let user = await User.findOne({ email }); //check the email is present in the database [check that user enter his email during the time of login is present in the database or not]

      // if user is not present then return a bad request
      if (!user) {
        success=false
        return res
          .status(404)
          .json({success, error: "Plase try to login using currect credentials" });
      }
      const passwordCompare = await bycrpt.compare(password, user.password); //this will return true or false .it will compare password user enter and password which is store database
      if (!passwordCompare) {
        success=false
        return res
          .status(404)
          .json({success, error: "Plase try to login using currect credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwtsecret);
      success =true
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);
//Route 3:- Get logging user detail using :POSt "/api/auth/getuser".Login required
Router.post("/getuser",fetchuser, async (req, res) => {
  try {
    userId =req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});
module.exports = Router;
