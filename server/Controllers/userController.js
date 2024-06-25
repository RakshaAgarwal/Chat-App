const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtKey, {expiresIn: '3d'})
}

const registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body
    let user = await userModel.findOne({email});
    if(user) return res.status(400).json("User already exist");
    if(!name || !password || !email) return res.status(400).json('All fields are required');
    if(!validator.isEmail(email)) return res.status(400).json('Enter a valid email');
    if(!validator.isStrongPassword(password)) return res.status(400).json('Password must be a strong a password');
    user = new userModel({name, email, password})
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save() //To save the data to the database
    const token = createToken(user._id);
    res.status(200).json({_id: user._id, name, email, token})
    }catch(error){
        res.send(500).json(error)
    }  
}

const loginUser = async(req, res)=>{
    try{
const {email, password} = req.body;
let user = await userModel.findOne({email});
if(!user)return res.status(400).json("Invalid Username or Password");
const isValidPassword = await bcrypt.compare(password, user.password);
if(!isValidPassword)return res.status(400).json("Invalid Username or Password");
const token = createToken(user._id);
res.status(200).json({_id: user._id, name: user.name, email, token})
    }
    catch(error){
        res.send(500).json(error)
    }
}

const findUser = async(req, res)=>{
    const userId = req.params.userId;
    try{
const user = await userModel.findById(userId);
res.status(200).json(user);
    }
    catch(error){
        res.send(500).json(error)
    }
}

const getUsers = async(req, res)=>{
    try{
const users = await userModel.find();
res.status(200).json(users);
    }
    catch(error){
        res.send(500).json(error)
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers}