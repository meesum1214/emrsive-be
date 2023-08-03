const db = require("../models");

const getAllUser = async () => {
    try {
        const users = await db.user.findAll({
            // attributes: {
            //     exclude: ["createdAt", "updatedAt", "role_id"],
            // },
            include: [
                {
                    model: db.roles,
                    attributes: ["name"],
                },
            ]
        });
        return {
            status: 200,
            message: "User fetched successfully",
            data: users,
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const getUser = async (userId) => {
    try {
        const user = await db.user.findOne({
            where: {
                id: userId,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        });

        if (!user) {
            return {
                status: 400,
                message: "User does not exist",
            };
        }

        return {
            status: 200,
            message: "User fetched successfully",
            data: user,
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const editUser = async (userId, body) => {
    try {
        const user = await db.user.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return {
                status: 400,
                message: "User does not exist",
            };
        }

        const updatedUser = await db.user.update(
            {
                ...body,
            },
            {
                where: {
                    id: userId,
                },
            },
        );

        return {
            status: 200,
            message: "User updated successfully",
            data: updatedUser,
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await db.user.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return {
                status: 400,
                message: "User does not exist",
            };
        }

        await db.user.destroy({
            where: {
                id: userId,
            },
        });

        return {
            status: 200,
            message: "User deleted successfully",
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

module.exports = {
    getAllUser,
    editUser,
    getUser,
    deleteUser
};