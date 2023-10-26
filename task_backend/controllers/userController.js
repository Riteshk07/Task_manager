import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import Validation from "./Validation.js";
import Jwt  from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

class UserController{
    static userRegistration = async (req, res)=>{
        const {role, name, email, password, conf_pw , tc} = req.body
        const user = await UserModel.findOne({email:email});
        if(user){
            res.send({
                "status": "failed",
                "message": "Email Already Exist!" 
            });
        }else{
            if(role && name && email && password && conf_pw && tc){
                
                if(!Validation.validatePassword(password, conf_pw)){
                    res.send({
                        "status": "failed",
                        "message": "Password not valid!" 
                    });
                }else if(!Validation.validateEmail(email)){
                    res.send({
                        "status": "failed",
                        "message": "Invalid Email" 
                    });
                }else{
                    try{
                        const salt  = await bcrypt.genSalt(12);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const doc = new UserModel({
                            role:role, 
                            name:name,
                            email:email,
                            password:hashPassword,
                            tc:tc
                        })
                        await doc.save();
                        const saved_user = await UserModel.findOne({email:email});
                        // Generate JWT token
                        const token = Jwt.sign({userID:saved_user._id}, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
                        res.status(201).send({
                            "status": "Succsessfull",
                            "message": "Data has been saved!" , 
                            "token":token
                        });
                    }catch(err){
                        console.log(err);
                        res.send({
                            "status": "failed",
                            "message": "bcrypt Error" 
                        });
                    }            
                }  
            }else{
                res.send({
                    "status": "failed",
                    "message": "All fields are required!" 
                });
            }
        }
        
    }

    static userLogin= async (req, res)=>{
        try{
            const {email, password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email:email}); 
                if(user){
                    const isMatch = await bcrypt.compare(password, user.password);
                    if(user.email === email, isMatch){
                        // Generate JWT Token
                        const token = Jwt.sign({userID:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
                        res.send({"status": "success", "message":"Login Succsessfull", "token":token});
                    }else{
                        res.send({"status": "failed", "message":"Email or password is not valid"});
                    }
                }else{
                    res.send({"status": "failed", "message":"You are not a register User"});
                }
            }else{
                res.send({"status": "failed", "message":"All Fields are required"});
            }
        }catch(err){
            console.log(err);
        }
    }
    static userLogout = (req, res) => {
        // In a real-world scenario, you might have additional logout logic.
        // For now, we'll just provide instructions to clear the token.
        res.send({
            "status": "success",
            "message": "Logged out successfully. Please clear the token from the client side."
        });
    }

    static changePassword = async (req, res)=>{
        const {password, conf_pw} = req.body;
        if(password && conf_pw){
            if(password === conf_pw){
                if(Validation.validatePassword(password, conf_pw)){
                    const salt  = await bcrypt.genSalt(12);
                    const hashPassword = await bcrypt.hash(password, salt);
                    await UserModel.findByIdAndUpdate(req.user._id, {$set: {password:hashPassword}});
                    res.send({"status": "success", "message":"Password Changed Successfully"});
                }
                else{
                    res.send({"status": "failed", "message":"password should be minimum eight charecter, One Upper Case and Lower case and shuld have number and special charecter"});
                }
            }else{
                res.send({"status": "failed", "message":"password and Confirm password does not match "});
            }
        }else{
            res.send({"status": "failed", "message":"All Fields are required"});
        }
    }

    static loggedUser = async (req, res)=>{
        res.send({"user": req.user});
    }

    static sendUserPasswordResetEmail = async(req, res)=>{
        const {email} = req.body
        if(email){
            const user = await UserModel.findOne({email:email})
            if(user){
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = Jwt.sign({userID:user._id}, secret, {expiresIn:"15m"});
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
                console.log(link);
                // Send Email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "GeekShop - Password Reset Link",
                    html: `<a href=${link}>Click Here</a> to reset your password`

                })

                res.send({"status": "success", "message":"sent in Email, Please check your email", "info":info});
            }else{
                res.send({"status": "failed", "message":"Email doesn't exists"});
            }
        }else{
            res.send({"status": "failed", "message":"Enter valid Email"});
        }
    }

    static confPasswordResetLink = async (req, res)=>{
        const {password, conf_pw} = req.body;
        const {id, token} = req.params
        const user = await UserModel.findById(id);
        const new_token = user._id+process.env.JWT_SECRET_KEY
        try {
            Jwt.verify(token, new_token);
            if(password && conf_pw){
                if(password === conf_pw){
                    if(Validation.validatePassword(password, conf_pw)){
                        const salt  = await bcrypt.genSalt(12);
                        const hashPassword = await bcrypt.hash(password, salt);
                        await UserModel.findByIdAndUpdate(id, {$set: {password:hashPassword}});
                        res.send({"status": "success", "message":"Password Changed Successfully"});
                    }
                    else{
                        res.send({"status": "failed", "message":"password should be minimum eight charecter, One Upper Case and Lower case and shuld have number and special charecter"});
                    }
                }else{
                    res.send({"status": "failed", "message":"password and Confirm password does not match "});
                }
            }else{
                res.send({"status": "failed", "message":"All Fields are required"});
            }
        } catch (error) {
            res.send({"status": "failed", "message":"Invalid Token"});
            console.log(error)
        }
    }

    
}

export default UserController;