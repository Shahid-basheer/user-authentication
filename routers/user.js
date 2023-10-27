const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers.js");
const middleware = require("../middleware/authMiddleware.js");
const homeControllers = require("../controllers/homeController.js");


router.post("/register",authControllers.register)
router.post("/login",authControllers.login)
router.get("/",middleware.authRequire,homeControllers.home)
router.get("/admin-dashboard",middleware.authRequire,middleware.isAdmin,homeControllers.dashboard)


module.exports = router;