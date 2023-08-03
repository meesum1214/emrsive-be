const { Op } = require("sequelize");
const db = require("../models");

module.exports = {
    postReview: async (data) => {
        try {
            const review = await db.reviews.create(data, {
                include: [
                    {
                        model: db.user,
                        attributes: ["id", "name", "email"],
                    },
                ],
            });
            return {
                status: 200,
                message: "Review posted successfully",
                data: review,
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Something went wrong",
            };
        }
    },
    getReviews: async () => {
        try {
            const reviews = await db.reviews.findAll({
                include: [
                    {
                        model: db.user,
                        attributes: ["id", "firstName", "lastName", "email"],
                    },
                ],
                attributes: ["id", "rating", "review"],
            });
            return {
                status: 200,
                message: "Reviews fetched successfully",
                data: reviews,
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Something went wrong",
            };
        }
    },
}