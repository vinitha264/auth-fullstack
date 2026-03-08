
const router = require("express").Router();
const isAuthenticated = require("../Middleware/authMiddleware");

router.get("/me", isAuthenticated, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;