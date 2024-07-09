const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
const signUp = async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile,
            isAdmin: req.body.isAdmin || false
        });
 
        const newUser = await user.save();
        res.status(201).json({message: 'User Registration Successful!', data: newUser});
 
    }catch(err) {
        res.status(400).json({message: err.message});
    }
}
 
const login = async(req, res) => {
   
    try{
 
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({message: 'User not found!'});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid Credentials!'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.status(200).json({message: 'User Login Successful!', token: token});
    }catch(err) {
        res.status(400).json({message: err.message});
    }
}
 
const details = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User details retrieved successfully', data: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
 
const updateDetails = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {new: true});
        res.status(200).json({message: 'User Details Updated', data: user});
    }catch(err) {
        res.status(400).json({message: err.message});
    }
}
 
const deleteUser = async (req, res) => {
    try {
        console.log('Delete user called');
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
 
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
 
        console.log('User deleted');
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};
 
module.exports = {
    signUp,
    login,
    details,
    updateDetails,
    deleteUser
}