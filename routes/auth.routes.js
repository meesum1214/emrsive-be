const express = require("express");
const router = express.Router();
const { createUser, userLogin } = require("../services/auth-service");

router.post("/register", (req, res) => {
    createUser(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.post("/login", (req, res) => {
    userLogin(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;