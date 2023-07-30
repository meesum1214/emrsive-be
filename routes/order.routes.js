const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const { createOrder, getOrders, getAllOrders, updateOrder, deleteOrder } = require("../services/order-service");
const router = express.Router();

router.post("/create/", isLoggedIn, (req, res) => {
    createOrder(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/get/:userId", isLoggedIn, (req, res) => {
    const { userId } = req.params;
    getOrders(userId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/getall/", isLoggedIn, (req, res) => {
    const { value, page, limit } = req.query;
    getAllOrders(req.jwt.id, value, page, limit)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.patch("/update/:orderId", isLoggedIn, (req, res) => {
    const { orderId } = req.params;
    updateOrder(orderId, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/delete/:orderId", isLoggedIn, (req, res) => {
    const { orderId } = req.params;
    deleteOrder(orderId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;