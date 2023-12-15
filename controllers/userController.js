import userModel from '../models/user.js';
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return next(createError(409, "Email already in use!"));
        }

        const newUser = new userModel(req.body);
        await newUser.save();

        const { password, isAdmin, ...otherDetails } = newUser._doc;
        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 3600000
        }).status(200).json({ access_token: token, details: { ...otherDetails }, isAdmin });
    } catch (err) {
        console.log(err);
        next(err);
    }
};


export const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username!"));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour in milliseconds
        }).status(200).json({ access_token: token, details: { ...otherDetails }, isAdmin });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

//test function
export const getcookie = async (req, res, next) => {
    res.cookie("access_token", "hi", {
        httpOnly: true,
    }).status(200).json({ msg: "Ok" })
}