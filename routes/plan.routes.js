const express = require("express");
const router = express.Router();
const { getAllPlans, createPlan, deletePlan, updatePlan } = require("../services/plan-service");

router.get("/getall", (req, res) => {
    getAllPlans()
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.post("/create-plan", (req, res) => {
    createPlan(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/delete-plan/:planId", (req, res) => {
    const { planId } = req.params;
    deletePlan(planId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.patch("/update-plan/:planId", (req, res) => {
    const { planId } = req.params;
    updatePlan(planId, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;