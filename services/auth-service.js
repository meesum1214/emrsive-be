const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (body) => {
    try {
        // check if user already exists
        const userExists = await db.user.findOne({
            where: {
                email: body.email,
            },
        });

        if (userExists) {
            return {
                status: 400,
                message: "User already exists",
            };
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // gereate token
        const token = jwt.sign({ email: body.email }, "emrsive-secret");

        // create user and inclute roles
        const user = await db.user.create({
            ...body,
            password: hashedPassword,
        });

        return {
            status: 200,
            message: "User registered successfully",
            token,
            data: user,
        }
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const userLogin = async (body) => {
    try {
        // check if user exists
        const user = await db.user.findOne({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            return {
                status: 400,
                message: "User does not exist",
            };
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(
            body.password,
            user.password
        );

        if (!validPassword) {
            return {
                status: 400,
                message: "Invalid password",
            };
        }

        // generate token
        const token = jwt.sign({ email: body.email }, "emrsive-secret");

        return {
            status: 200,
            message: "User logged in successfully",
            token,
            data: user,
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

module.exports = {
    createUser,
    userLogin,
};