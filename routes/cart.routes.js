const express = require("express");
const { addCartItem, getCartItems, deleteCartItem, emptyCart } = require("../services/cart-service");
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

router.delete("/delete-cart-item/", isLoggedIn, (req, res) => {
    const { cart_id } = req.query;
    deleteCartItem(cart_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

router.delete("/all/", isLoggedIn, (req, res) => {
    const { user_id } = req.query;
    emptyCart(user_id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        });
});

module.exports = router;