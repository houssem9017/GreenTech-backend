import userModel from '../models/user.js';
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res, next) => {
    console.log(req.body.userType);
    try {
        const existingUser = await userModel.findOne({ email:req.body.userType.email });
        if (existingUser) {
            return next(createError(409, "Email already in use!"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.userType.password, salt);
        
        const newUser = new userModel({
            ...req.body.userType,
            password: hash,
        });
        await newUser.save();
        const { password, isAdmin, ...otherDetails } = newUser._doc;
        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT
        );
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ access_token: token, details: { ...otherDetails }, isAdmin });
    } catch (err) {
        
console.log(err)
        next(err);
    }
};

export const login = async (req, res, next) => {
    
console.log(req.body);
    
console.log("i'm at login");
    try {
        const user = await userModel.findOne({ email: req.body.email.email });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.email.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
                
        maxAge: 900000, httpOnly: true,
            })
            .status(200)
            .json({access_token:token,details: { ...otherDetails }, isAdmin });
    } catch (err) {
        
console.log(err);
        next(err);
    }
};

export const test = async (req, res, next) => {
    res.status(200).json({msg:"Ok"})
}

export const getcookie = async (req, res, next) => {
    res.cookie("access_token", "hi", {
        httpOnly: true,
    }).status(200).json({ msg: "Ok" })
}
function generateRandomSixDigitNumber() {
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const sendcode = async (req, res, next) => {
    try {
        console.log(req.body.email);
        const user = await userModel.findOne({ email: req.body.email.email });
        if (!user) return next(createError(404, "User not found!"));
        user.ConfirmationCode = generateRandomSixDigitNumber()
        await user.save();
        res.status(200).json({ msg: "Ok" })
    } catch (err) {
        next(err);
    }
}

export const verifycode = async (req, res, next) => {
    try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin }, process.env.JWT
    );
    if (user.ConfirmationCode == req.body.confirmationCode)
        return res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ access_token: token, msg: "Ok" })
    return res.status(500).json({ msg: "Not ok" })
    } catch (err) {
        next(err);
    }
}

export const newPassword = async (req, res, next) => {
    try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    await user.save();
        return res.status(200).json({ msg: "Ok" })
    } catch (err) {
        next(err);
    }
}













/*var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "houssem.darragi@outlook.com",
        pass: "PLqn85VUs/fG(u6"
    }
});
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    service: "outlook",
    auth: {
        user: "houssem.darragi@outlook.com",
        pass: "PLqn85VUs/fG(u6"
    },
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
});
const mailOptions = {
from: 'houssem darragi',
to: req.body.email,
subject: 'Invite to hotel',
    text: "Did you receive the invitation to the hotel?"
};
const info = await transporter.sendMail(mailOptions);
    */