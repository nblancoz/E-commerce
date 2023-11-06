const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/", UserController.create);
router.get("/getAll", UserController.getAll);
router.get("/getByName/:name", UserController.getOneByName);
router.post("/login", UserController.login);
router.delete("/deleteByName/:name", authentication, isAdmin, UserController.delete)
router.delete("/logout", authentication, UserController.logout)

module.exports = router;