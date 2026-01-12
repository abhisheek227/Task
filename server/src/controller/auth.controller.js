import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const userRegister = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!email) {
        return next(new ApiError(400, "Email required"))
    }
    if (!name) {
        return next(new ApiError(400, "Email required"))
    }
    if (!password || password < 6) {
        return next(new ApiError(400, "Password must be 6 character"))
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        return next(new ApiError(403, "User alredy exist"))
    }

    const createdUser = await User.create({
        name,
        email,
        password
    });

    res.status(200).json({
        msg: "User is created Successfully",
        statusCode: 201,
        success: true,
    })
}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return next(new ApiError(401, "All feild are require"))
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
        return next(new ApiError(401, 'User is not created or exist go create user'));
    }

    const checkPassword = await checkUser.comparePassword(password)
    if (!checkPassword) {
        return next(new ApiError(403, "Password is incorrect"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(checkUser._id)



    res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({
            msg: "User Log in",
            email,
            accessToken: accessToken,
            refreshToken: refreshToken,
            statusCode: 200,
            success: true,
        })
}

const refreshAccessToken = async (req, res, next) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!incomingRefreshToken) {
        return next(new ApiError(401, "Unauthorized request"))
    }


    const decoded = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_KEY
    )

    const user = await User.findById(decoded._id)

    if (!user || user.refreshToken !== incomingRefreshToken) {
        return next(new ApiError(403, "Invalid refresh token"))
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({
            message: "Token refreshed",
            accessToken,
            refreshToken,
            statusCode: 200,
            success: true,
        })

}



export { userRegister, userLogin, refreshAccessToken, }