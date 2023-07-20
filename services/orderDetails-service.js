const db = require("../models");

const createOrderDetail = async (order) => {
    try {
        const plan = await db.plans.findOne({
            where: {
                id: order.plan_id
            }
        });

        const newOrderDetail = await db.orderDetails.create({
            ...order,
            description: plan.description,
        });

        return {
            status: 200,
            message: "Order Detail added successfully",
            data: newOrderDetail
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const updateOrderDetail = async (order, detail_id) => {
    try {
        const orderDetail = await db.orderDetails.findOne({
            where: {
                id: detail_id
            }
        });

        if (!orderDetail) {
            return {
                status: 404,
                message: "Order Detail not found"
            };
        }

        const updatedOrderDetail = await db.orderDetails.update(order, {
            where: {
                id: detail_id
            }
        });

        return {
            status: 200,
            message: "Order Detail updated successfully",
            data: updatedOrderDetail
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const getOrderDetails = async (order_id) => {
    try {
        const orderDetails = await db.orderDetails.findAll({
            where: {
                order_id
            },
            include: [
                {
                    model: db.plans,
                    attributes: ["name", "description", "price"],
                },
            ],
        });

        if (!orderDetails) {
            return {
                status: 404,
                message: "Order Details not found"
            };
        }

        return {
            status: 200,
            message: "Order Details retrieved successfully",
            data: orderDetails
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const deleteOrderDetails = async (order_id) => {
    try {
        const orderDetails = await db.orderDetails.destroy({
            where: {
                id: order_id
            }
        });

        if (!orderDetails) {
            return {
                status: 404,
                message: "Order Details not found"
            };
        }

        return {
            status: 200,
            message: "Order Details deleted successfully",
            data: orderDetails
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

module.exports = {
    createOrderDetail,
    updateOrderDetail,
    getOrderDetails,
    deleteOrderDetails
};