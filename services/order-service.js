const db = require("../models");

const createOrder = async (order) => {
    try {
        const user = await db.user.findOne({
            where: {
                id: order.user_id
            }
        });

        if (!user) {
            return {
                status: 404,
                message: "User not found"
            };
        }

        const newOrder = await db.order.create({
            ...order,
            orderStatus: "pending"
        });

        return {
            status: 200,
            message: "Order created successfully",
            data: newOrder
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const getOrders = async (userId) => {
    try {
        const user = await db.user.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return {
                status: 404,
                message: "User not found"
            };
        }

        const orders = await db.order.findAll({
            where: {
                user_id: userId
            },
            attributes: {
                exclude: ["updatedAt"]
            }
        });

        return {
            status: 200,
            message: "Orders fetched successfully",
            data: orders
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const getAllOrders = async () => {
    try {
        const orders = await db.order.findAll({
            include: [
                {
                    model: db.user,
                    attributes: ["id", "firstName", "lastName", "email"],
                    include: [
                        {
                            model: db.roles,
                            attributes: ["id", "name"]
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ["updatedAt", "user_id"]
            }
        });

        return {
            status: 200,
            message: "Orders fetched successfully",
            data: orders
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const updateOrder = async (orderId, body) => {
    try {
        const order = await db.order.findOne({
            where: {
                id: orderId
            }
        });

        if (!order) {
            return {
                status: 404,
                message: "Order not found"
            };
        }

        const updatedOrder = await db.order.update(
            body,
            {
                where: {
                    id: orderId
                }
            }
        );

        return {
            status: 200,
            message: "Order updated successfully",
            data: updatedOrder
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const deleteOrder = async (orderId) => {
    try {
        const order = await db.order.findOne({
            where: {
                id: orderId
            }
        });

        if (!order) {
            return {
                status: 404,
                message: "Order not found"
            };
        }

        // Delete order details against order_id from order_details table first
        await db.orderDetails.destroy({
            where: {
                order_id: orderId
            }
        });

        await db.order.destroy({
            where: {
                id: orderId
            }
        });

        return {
            status: 200,
            message: "Order deleted successfully"
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

module.exports = {
    createOrder,
    getOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
};