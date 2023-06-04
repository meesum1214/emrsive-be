const express = require("express");
const { addCartItem, getCartItems, deleteCartItem } = require("../services/cart-service");
const { isLoggedIn } = require("../middlewares/auth");
const router = express.Router();

router.post("/add-cart-item/", isLoggedIn, (req, res) => {
    addCartItem(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.get("/get-cart-items/:user_id", isLoggedIn, (req, res) => {
    const { user_id } = req.params;
    getCartItems(user_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/delete-cart-item/:cart_id", isLoggedIn, (req, res) => {
    const { cart_id } = req.params;
    deleteCartItem(cart_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;