const express = require("express");
const { getAnalytics } = require("../services/dashboard-service");
const router = express.Router();

router.get("/", (req, res) => {
    const { startDate, endDate } = req.query;
    getAnalytics(startDate, endDate)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;