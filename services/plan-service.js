const db = require("../models");

const getAllPlans = async () => {
    try {
        const plans = await db.plans.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        });
        return {
            status: 200,
            message: "Plans fetched successfully",
            data: plans,
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const createPlan = async (body) => {
    try {
        const plan = await db.plans.create(body);
        return {
            status: 200,
            message: "Plan created successfully",
            data: plan,
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const deletePlan = async (planId) => {
    try {
        const plan = await db.plans.findOne({
            where: {
                id: planId,
            },
        });
        
        if (!plan) {
            return {
                status: 400,
                message: "Plan does not exist",
            };
        }

        await db.plans.destroy({
            where: {
                id: planId,
            },
        });

        return {
            status: 200,
            message: "Plan deleted successfully",
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

const updatePlan = async (planId, body) => {
    try {
        const plan = await db.plans.findOne({
            where: {
                id: planId,
            },
        });

        if (!plan) {
            return {
                status: 400,
                message: "Plan does not exist",
            };
        }

        await db.plans.update(body, {
            where: {
                id: planId,
            },
        });

        return {
            status: 200,
            message: "Plan updated successfully",
        };
    } catch (error) {
        console.log(error);
        return { message: error.message || "Internal server error" };
    }
};

module.exports = {
    getAllPlans,
    createPlan,
    deletePlan,
    updatePlan
};