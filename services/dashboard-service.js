const { Op } = require("sequelize");
const db = require("../models");

module.exports = {
    getAnalytics: async (startDate, endDate) => {
        try {
            let start;
            let end;

            whereClause = {};

            if (startDate && endDate) {
                start = new Date(startDate);
                end = new Date(endDate);
                end.setDate(end.getDate() + 1);

                whereClause = {
                    createdAt: {
                        [Op.between]: [start, end],
                    },
                };
            }

            const result = await db.order.findAll({
                where: whereClause,
                include: [
                    {
                        model: db.orderDetails,
                        include: [
                            {
                                model: db.plans,
                                attributes: ["id", "name", "price"],
                            },
                        ],
                    },
                ],
            });

            // calculate total revenue
            let totalRevenue = 0;
            result.forEach((order) => {
                order.Order_Details.forEach((orderDetail) => {
                    totalRevenue += orderDetail.Plan.price;
                });
            });

            // calculate total orders
            let totalOrders = result.length;

            // calculate total revenue of each plan
            let planRevenue = { Premium: 0, Standard: 0, Basic: 0 };
            result.forEach((order) => {
                order.Order_Details.forEach((orderDetail) => {
                    if (planRevenue[orderDetail.Plan.name]) {
                        planRevenue[orderDetail.Plan.name] += orderDetail.Plan.price;
                    } else {
                        planRevenue[orderDetail.Plan.name] = orderDetail.Plan.price;
                    }
                });
            });

            // calculate total orders of each plan
            let planOrders = { Premium: 0, Standard: 0, Basic: 0 };
            result.forEach((order) => {
                order.Order_Details.forEach((orderDetail) => {
                    if (planOrders[orderDetail.Plan.name]) {
                        planOrders[orderDetail.Plan.name] += 1;
                    } else {
                        planOrders[orderDetail.Plan.name] = 1;
                    }
                });
            });

            // ====================================================================================================================
            // calculate total revenue of each day
            let dayRevenue = {};
            result.forEach((order) => {
                let date = new Date(order.createdAt);
                date.setHours(0, 0, 0, 0);
                if (dayRevenue[date]) {
                    order.Order_Details.forEach((orderDetail) => {
                        dayRevenue[date] += orderDetail.Plan.price;
                    });
                } else {
                    dayRevenue[date] = 0;
                    order.Order_Details.forEach((orderDetail) => {
                        dayRevenue[date] += orderDetail.Plan.price;
                    });
                }
            });

            // calculate total orders of each day
            let dayOrders = {};
            result.forEach((order) => {
                let date = new Date(order.createdAt);
                date.setHours(0, 0, 0, 0);
                if (dayOrders[date]) {
                    dayOrders[date] += 1;
                } else {
                    dayOrders[date] = 1;
                }
            });

            // calculate total revenue of each month
            let monthRevenue = {};
            result.forEach((order) => {
                let date = new Date(order.createdAt);
                date.setDate(1);
                date.setHours(0, 0, 0, 0);
                if (monthRevenue[date]) {
                    order.Order_Details.forEach((orderDetail) => {
                        monthRevenue[date] += orderDetail.Plan.price;
                    });
                } else {
                    monthRevenue[date] = 0;
                    order.Order_Details.forEach((orderDetail) => {
                        monthRevenue[date] += orderDetail.Plan.price;
                    });
                }
            });
            // ====================================================================================================================

            return {
                status: 200,
                message: "Success",
                data: {
                    revenue: totalRevenue,
                    sales: totalOrders,
                    planRevenue: planRevenue,
                    planOrders: planOrders,
                    // dayRevenue: dayRevenue,
                    // dayOrders: dayOrders,
                    // monthRevenue: monthRevenue,
                    // orders: result,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Something went wrong",
            };
        }
    }
};