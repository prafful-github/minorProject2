const express = require('express');
const router = express.Router();
const User = require('../src/models/User')
const {body, validationResult} = require("express-validator");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "qwertyuioppoiuytrewq";


router.post("/createuser", 
    [body('email', 'not a valid email').isEmail(), body('password', 'password must contain atleast 5 characters').isLength({min:5}), body('name').isLength({min:5})] ,
     async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try{
      await  User.create({
                name: req.body.name,
                email:req.body.email,
                password: secPassword,
                location: req.body.location
             })
        res.json({success:true});
    } catch (error){
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginuser",  [body('email', 'not a valid email').isEmail(), body('password', 'password must contain atleast 5 characters').isLength({min:5})] , async(req, res)=> {

    let email = req.body.email;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    try{
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({error: "plz enter valid details"})
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if(!pwdCompare){
            return res.status(400).json({error: "plz enter valid details"})
        }

        const data = {
            user:{id:userData.id}
        }

        const authToken = jwt.sign(data, jwtSecret)

        return res.json({success:true, authToken:authToken})

    }catch (error) {
        console.log(error)
        res.json({success:false})
    }
})

module.exports = router;