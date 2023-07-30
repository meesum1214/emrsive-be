const express = require("express");
const router = express.Router();
const { getAllUser, editUser, getUser, deleteUser } = require("../services/user-service");
const { isLoggedIn } = require("../middlewares/auth");

router.get("/getall", isLoggedIn, (req, res) => {
    getAllUser()
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/getuser/:userId", isLoggedIn, (req, res) => {
    const { userId } = req.params;
    getUser(userId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.patch("/edit-users/:userId", isLoggedIn, (req, res) => {
    const { userId } = req.params;
    editUser(userId, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/:userId", isLoggedIn, (req, res) => {
    const { userId } = req.params;
    deleteUser(userId)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;