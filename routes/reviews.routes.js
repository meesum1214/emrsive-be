const express = require("express");
const { postReview, getReviews } = require("../services/reviews-service");
const router = express.Router();

router.post("/", (req, res) => {
    postReview(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/", (req, res) => {
    getReviews()
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;