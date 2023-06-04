const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const planRoutes = require("./plan.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/plan", planRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

module.exports = router;