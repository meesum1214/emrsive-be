const db = require("../models");

const addCartItem = async (body) => {
    try {
        // check if user already exists
        const userExists = await db.user.findOne({
            where: {
                id: body.user_id,
            },
        });

        if (!userExists) {
            return {
                status: 400,
                message: "User does not exist",
            };
        }

        // check if plan already exists
        const planExists = await db.plans.findOne({
            where: {
                id: body.plan_id,
            },
        });

        if (!planExists) {
            return {
                status: 400,
                message: "Plan does not exist",
            };
        }

        // Create cart item
        const cartItem = await db.cart.create(body);

        // get cart items and include plan and user
        const getCartItems = await db.cart.findAll({
            where: {
                id: cartItem.id,
            },
            include: [
                {
                    model: db.plans,
                    attributes: ["name", "description", "price"],
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        return {
            status: 200,
            message: "Cart item added successfully",
            data: getCartItems,
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const getCartItems = async (userId) => {
    try {
        // check if user already exists
        const userExists = await db.user.findOne({
            where: {
                id: userId,
            },
        });

        if (!userExists) {
            return {
                status: 400,
                message: "User does not exist",
            };
        }

        // get cart items and include plan and user
        const getCartItems = await db.cart.findAll({
            where: {
                user_id: userId,
            },
            include: [
                {
                    model: db.plans,
                    attributes: ["name", "description", "price"],
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        return {
            status: 200,
            message: "Cart items fetched successfully",
            data: getCartItems,
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const deleteCartItem = async (cartId) => {
    try {
        // check if cart item already exists
        const cartItemExists = await db.cart.findOne({
            where: {
                id: cartId,
            },
        });

        if (!cartItemExists) {
            return {
                status: 400,
                message: "Cart item does not exist",
            };
        }

        // delete cart item
        await db.cart.destroy({
            where: {
                id: cartId,
            },
        });

        return {
            status: 200,
            message: "Cart item deleted successfully",
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const emptyCart = async (userId) => {
    try {
        // check if cart item already exists
        const cartItemExists = await db.cart.findAll({
            where: {
                user_id: userId,
            },
        });

        if (cartItemExists.length == 0) {
            return {
                status: 400,
                message: "Cart item does not exist",
            };
        }

        // delete cart item
        await db.cart.destroy({
            where: {
                user_id: userId,
            },
        });

        return {
            status: 200,
            message: "Cart is now empty!",
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
}

module.exports = {
    addCartItem,
    getCartItems,
    deleteCartItem,
    emptyCart
};