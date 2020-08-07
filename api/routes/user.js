const express = require("express");
const router = express.Router();

const { requiresSignin, isAuth, isAdmin, requireSignin } = require("../controllers/auth");

const {
    userById,
    read,
    update
} = require("../functions/user");
// routes 
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
//  orders route comes here 
// claims or returns
router.param("userId", userById);

module.exports = router;