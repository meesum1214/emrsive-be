const express = require("express");
const { createOrder, getOrders, getAllOrders, updateOrder, deleteOrder, getByPlanId } = require("../services/order-service");
const router = express.Router();

router.post("/create/", (req, res) => {
    createOrder(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/get/:userId", (req, res) => {
    const { userId } = req.params;
    getOrders(userId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/getall/", (req, res) => {
    const { value, page, limit } = req.query;
    getAllOrders(req.jwt.id, value, page, limit)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/byplan/", (req, res) => {
    const { planId, page, limit } = req.query;
    getByPlanId(req.jwt.id, planId, page, limit)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.patch("/update/:orderId", (req, res) => {
    const { orderId } = req.params;
    updateOrder(orderId, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/delete/:orderId", (req, res) => {
    const { orderId } = req.params;
    deleteOrder(orderId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;