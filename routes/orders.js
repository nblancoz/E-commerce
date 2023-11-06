const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/create", authentication, OrderController.create);
router.get("/getAll", OrderController.getAll);
router.delete("/deleteById/:id", authentication, isAdmin, OrderController.deleteById);

module.exports = router;