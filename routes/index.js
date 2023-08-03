const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const planRoutes = require("./plan.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const orderDetailsRoutes = require("./orderDetails.routes");
const dashboardRoutes = require("./dashboard.routes");
const reviewsRoutes = require("./reviews.routes");
const { isLoggedIn } = require("../middlewares/auth");

router.use("/auth", authRoutes);
router.use("/user", isLoggedIn, userRoutes);
router.use("/plan", isLoggedIn, planRoutes);
router.use("/cart", isLoggedIn, cartRoutes);
router.use("/order", isLoggedIn, orderRoutes);
router.use("/orderDetails", isLoggedIn, orderDetailsRoutes);
router.use("/dashboard", isLoggedIn, dashboardRoutes);
router.use("/reviews", isLoggedIn, reviewsRoutes);

module.exports = router;