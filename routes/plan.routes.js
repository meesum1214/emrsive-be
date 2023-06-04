const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth");
const { getAllPlans, createPlan, deletePlan, updatePlan } = require("../services/plan-service");

router.get("/getall", isLoggedIn, (req, res) => {
    getAllPlans()
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.post("/create-plan", isLoggedIn, (req, res) => {
    createPlan(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/delete-plan/:planId", isLoggedIn, (req, res) => {
    const { planId } = req.params;
    deletePlan(planId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.patch("/update-plan/:planId", isLoggedIn, (req, res) => {
    const { planId } = req.params;
    updatePlan(planId, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;