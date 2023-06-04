const jwt = require("jsonwebtoken");

// ==================================== check token validation ========================
const isLoggedIn = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token || token == "undefined") {
        res.status(401).json("Unauthorize user");
        return 0;
    }
    try {
        const decoded = jwt.verify(token, "emrsive-secret");
        if (!decoded) {
            res.status(403).send("Unauthorized user");
            // next();
        }

        req.jwt = decoded;

        next();

        // next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
};

module.exports = {
    isLoggedIn,
};