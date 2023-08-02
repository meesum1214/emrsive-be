const express = require("express");
const { createOrderDetail, updateOrderDetail, getOrderDetails, deleteOrderDetails } = require("../services/orderDetails-service");
const router = express.Router();

router.post("/", (req, res) => {
    createOrderDetail(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.patch("/:detail_id", (req, res) => {
    const { detail_id } = req.params;
    updateOrderDetail(req.body, detail_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/:order_id", (req, res) => {
    const { order_id } = req.params;
    getOrderDetails(order_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/:detail_id", (req, res) => {
    const { detail_id } = req.params;
    deleteOrderDetails(detail_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;