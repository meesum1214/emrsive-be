const { Op } = require("sequelize");
const db = require("../models");
const moment = require("moment/moment");

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

const getAllOrders = async (userId, value, page, limit) => {
    try {

        const user = await db.user.findOne({
            where: {
                id: userId
            }
        });

        // only admin can access this route
        if (user.role_id !== 1) {
            return {
                status: 401,
                message: "You are not authorized to access this route",
            };
        }

        if (!page || !limit) {
            return {
                status: 400,
                message: "Please provide all the required fields",
            };
        }

        let clause = {
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: `${value}%`
                    }
                },
                {
                    lastName: {
                        [Op.like]: `${value}%`
                    }
                },
                {
                    orderStatus: {
                        [Op.like]: `${value}%`
                    }
                },
                {
                    orderPrice: {
                        [Op.like]: `${value}%`
                    }
                },
            ]
        };

        let whereClause;

        // if value is not empty then search with value
        if (value) {      
            // if value is a valid date for format 'YYYY-MM-DD' then search with specific Date
            if (moment(value, "YYYY-MM-DD", true).isValid()) {
                value = moment(value).format("YYYY-MM-DD");
                whereClause = {
                    createdAt: {
                        [Op.and]: [
                            db.sequelize.where(db.sequelize.fn('strftime', '%Y-%m-%d', db.sequelize.col('order.createdAt')), value),
                        ],
                    }
                };

            // if value is a valid date for format 'YYYY-MM' then search with specific Month of year
            } else if(moment(value, "YYYY-MM", true).isValid()) {
                value = moment(value).format("YYYY-MM");
                whereClause = {
                    createdAt: {
                        [Op.and]: [
                            db.sequelize.where(db.sequelize.fn('strftime', '%Y-%m', db.sequelize.col('order.createdAt')), value),
                        ],
                    }
                };

                // if value is a string then search with firstName, lastName, orderStatus, orderPrice
            } else {
                whereClause = clause;
            }
        }

        const orders = await db.order.findAll({
            where: whereClause,
            // raw: true,
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
            },
            limit,
            offset: (page - 1) * limit
        });

        // total items
        const totalItems = await db.order.count({
            where: whereClause
        });

        // total pages
        const totalPages = Math.ceil(totalItems / limit);

        return {
            status: 200,
            message: "Orders fetched successfully",
            totalItems,
            totalPages,
            data: orders
        };

    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const getByPlanId = async (userId, planId, page, limit) => {
    try {
        const user = await db.user.findOne({
            where: {
                id: userId
            }
        });

        // only admin can access this route
        if (user.role_id !== 1) {
            return {
                status: 401,
                message: "You are not authorized to access this route",
            };
        }

        if (!page || !limit) {
            return {
                status: 400,
                message: "Please provide all the required fields",
            };
        }

        const orders = await db.orderDetails.findAll({
            where: {
                plan_id: planId
            },
            attributes: {
                exclude: ["updatedAt", "plan_id"]
            },
        });

        let allOrderIds = [];

        for(let i = 0; i < orders.length; i++) {
            allOrderIds = [...allOrderIds, orders[i].order_id];
        }

        const allOrders = await db.order.findAll({
            where: {
                id: {
                    [Op.in]: allOrderIds
                }
            },
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
            },
            limit,
            offset: (page - 1) * limit
        });

        // total items
        const totalItems = await db.order.count({
            where: {
                id: {
                    [Op.in]: allOrderIds
                }
            }
        });

        // total pages
        const totalPages = Math.ceil(totalItems / limit);

        return {
            status: 200,
            message: "Orders fetched successfully",
            totalItems,
            totalPages,
            data: allOrders
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
    deleteOrder,
    getByPlanId
};